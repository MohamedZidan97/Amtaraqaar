import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../Services/property.service';
import { IGetPropertyById } from '../Models/iget-property-by-id';
import { DetailsOfPropertyService } from '../../../DetailsOfProperities/Services/details-of-property.service';
import { ICategory } from '../../../DetailsOfProperities/Models/icategory';
import { environment } from '../../../../../Environments/environment.prod';

@Component({
  selector: 'app-edit-on-ad',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-on-ad.component.html',
  styleUrl: './edit-on-ad.component.scss'
})


export class EditOnAdComponent implements OnInit {
  baseUrl: string = environment.baseUrl;
  imageList: string[] = [];
  imageListForm: { id:number, path: string }[] = [];
  categoryList: ICategory[] = [];
  subCategoryList: ICategory[] = [];
  featureList: ICategory[] = [];
  dropdownOpen = false;
  editOnAd: FormGroup;
  propertyId: number = 0;
  subCategoryArray: number[] = []
  subCategoryNameArray: ICategory[] = []
  subCategoryNameArrayMap: string[] = []
  removeImageList:number[]=[];


  constructor(private fb: FormBuilder, private activitedRoute: ActivatedRoute,
    private router: Router, private propertySer: PropertyService,
    private detailSer: DetailsOfPropertyService) {
    this.editOnAd = this.fb.group({
      title: [''],
      description: [''],
      city: [''],
      governorate: [''],
      district: [''],
      address: [''],
      room: [''],
      bathroom: [''],
      floor: [''],
      spaces: [''],
      price: [''],
      section: [''],
      payment:[''],
      advertiserNumber:[''],
      advertiserType:[''],
      typeOfProperty:[''],
      featureIds: fb.array([]), //array of checkBox
      categoryIds: fb.array([]), // array of checkBok
      subCategoryIds: fb.array([]) // array of checkBok
    })
  }
  // sub Categories  Form

  ngOnInit(): void {
    this.imageList;
    this.propertyId = Number(this.activitedRoute.snapshot.paramMap.get('propertyId'));
    this.getPropertyByIdObserve();
  }
  //

  get categoryIds() {
    return this.editOnAd.get('categoryIds') as FormArray;
  }

  get featureIds() {
    return this.editOnAd.get('featureIds') as FormArray;
  }
  
  get propertyType():string{
    return this.editOnAd.get('typeOfProperty')?.value as string;
  }


  // get by id 
  getPropertyByIdObserve() {
    this.propertySer.getPropertyById(this.propertyId).subscribe(
      {
        next: (res) => {
          const data = res.data; // استخراج البيانات من res.data
          console.log(data)
          const mappedProperty: IGetPropertyById = {
            title: data.title,
            description: data.description,
            price: data.price,
            section: data.section,
            categoryIds: data.categories.map((it:any)=>it.id),
            room: data.room,
            bathroom: data.bathroom, floor: data.floor,
            spaces: data.spaces,
            advertiser_type: data.advertiser_type,
            advertiser_number:data.advertiser_number,
            address: data.address, active: data.active,
            images: data.images.map((item: any) => ({
              id: item.id,
              path: item.path
            })),type_of_property:data.type_of_property,
            subCategoryIds: data.sub_categories.map((it:any)=>it.id),
            featureIds: data.features.map((it:any)=>it.id),
            cityId: data.cityId, cityName: data.cityName,
            governorateId: data.governorateId, governorateName: data.governorateName,
            districtId: data.districtId, districtName: data.districtName
          }

          this.imageListForm = mappedProperty.images;
          this.subCategoryArray = mappedProperty.subCategoryIds;
          this.getDataInForm(mappedProperty);
          this.detailSer.getAllCategories().subscribe({
            next: (res) => {
              this.categoryList = res.data; // Update BehaviorSubject

              this.categoryList.forEach((feature) => {
                const isSelected = mappedProperty.categoryIds.some((item: any) => item === feature.id); // التحقق من التحديد
             //   console.log(feature.id, isSelected);
                this.categoryIds.push(this.fb.control(isSelected)); // إضافة FormControl

                if (isSelected) {
                  this.subCategoryList.push(...feature.children);
                }
              });

              this.subCategoryArray.forEach((feature) => {
                this.subCategoryIds.push(this.fb.control(feature));

              });

              this.subCategoryNameArray = this.subCategoryList.filter((i) =>
                this.subCategoryArray.some((h) => h === i.id));
              this.subCategoryNameArrayMap = this.subCategoryNameArray.map(i => i.ar_title);


            },
            error: (err) => {
              console.error("Error fetching prop:", err); // التعامل مع الأخطاء
            },
          });

          this.detailSer.getAllFeatures().subscribe({
            next: (res) => {
              this.featureList = res.data; // Update BehaviorSubject
              this.featureList.forEach((feature) => {
                const isSelected = mappedProperty.featureIds.some((item: any) => item === feature.id); // التحقق من التحديد
               // console.log(feature.id, isSelected);
                this.featureIds.push(this.fb.control(isSelected)); // إضافة FormControl

              });
            },
            error: (err) => {
              console.error("Error fetching prop:", err); // التعامل مع الأخطاء
            }
          }
          )

          console.log("Property get by id successfully:", mappedProperty);
        },
        error: (err) => {
          console.error("Error fetching packages:", err); // التعامل مع الأخطاء
        },
      })
  }



  getDataInForm(data: IGetPropertyById) {
    this.editOnAd.patchValue({
      title: data.title,description: data.description,
      price: data.price,section: data.section,
      categoryIds: data.categoryIds,room: data.room,
      bathroom: data.bathroom, floor: data.floor, spaces: data.spaces,
      advertiser_type: data.advertiser_type,advertiserNumber:data.advertiser_number,
      typeOfProperty:data.type_of_property,
      address: data.address, active: data.active,
    });
  }


  //update
  updatePropertyObserve() {
    if (this.editOnAd.valid) {

      const data = this.editOnAd.value;
      // category
      const selectIdCat = this.categoryList
        .map((item, index) => (data.categoryIds[index] ? item.id : null))
        .filter((id) => id !== null) as number[];
     // console.log(selectIdCat)
      // sub category
      const selectIdSubCat = this.subCategoryArray;
      //console.log(selectIdSubCat)
      // feature
      const selectIdFeat = this.featureList
        .map((item, index) => (data.featureIds[index] ? item.id : null))
        .filter((id) => id !== null) as number[];
      //console.log(selectIdFeat);


      // image

      // إعداد بيانات الـ IAddPackage
      // const formData = this.fileList; // استخدام fileList التي تم بناؤها
      // formData.append("title", String(data.title)); // إضافة أي بيانات إضافية إذا لزم الأمر
      // formData.append("description", String(data.description));
      // formData.append("price", (data.price));
      // formData.append("address", String(data.title));
      // formData.append("section",String( data.section));
      // formData.append("spaces", String(data.title));
      // formData.append("room", String(data.room));
      // formData.append("bathroom", String(data.bathroom));
      // formData.append("floor", String(data.floor));


      const formData= new FormData();
      formData.append('title',data.title);
      formData.append('description',data.description);
      formData.append('price',data.price);
      formData.append("address",data.address);
      formData.append("section",data.section);
      formData.append("spaces",data.spaces);
      formData.append("room",data.room);
      formData.append("bathroom",data.bathroom);
      formData.append("floor",data.floor);
      formData.append("handover","2025-12-01");
      formData.append("payment","cash");
      formData.append("type_of_property",data.typeOfProperty);
      formData.append("advertiser_type","jjj");
      formData.append("advertiser_number",data.advertiserNumber)
      formData.append("_method","put");
      this.uploadImages.forEach((file)=>{
        formData.append("images[]",file);
      })
      selectIdFeat.forEach((id)=>{
        formData.append("features_ids[]",id.toString());
      })
      selectIdCat.forEach((id)=>{
        formData.append("categories_ids[]",id.toString());
      })
      selectIdSubCat.forEach((id)=>{
        formData.append("sub_categories_ids[]",id.toString());
      })
      // إرسال البيانات إلى الـ API
      this.propertySer.updateProperty(this.propertyId, formData).subscribe(
        {
          next: (response) => {
            if(this.removeImageList.length>0){
              for(let i of this.removeImageList){
                this.removeImagesObserve(i);
              }
            }
            this.editOnAd.reset();
            this.router.navigate(['/ShowAllAdvs']);
            console.log('Propery edit successfully:', response);

          },
          error: (error) => {
            console.error('Error edit property:', error);
          }
        }
      );
    } else {
      console.error('Form is invalid!');
    }

   // this.addImagesOfPropertyObserve(this.uploadImages);
  }
 removeImagesObserve(idImage:number){
  this.propertySer.removeImages(this.propertyId,idImage).subscribe({
    next: (response) => {
      console.log('image remove successfully:', response);
    },
    error: (error) => {
      console.error('Error remove image:', error);
    }
  }
  )
 }
 
  //                         Property Features  

 
 //uploadImages:FormData = new FormData();
  uploadImages:File[]=[];
  // Method to handle file selection
  onFileSelected(event: any): void {
    const input = event.target as HTMLInputElement;
    this.uploadImages =  Array.from(event.target.files);
    if (input.files) {
      Array.from(input.files).forEach((file) => {
       // this.uploadImages.append('img',file);

       //this.uploadImages.push(file);
       console.log("inside", this.uploadImages);
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target?.result) {
            this.imageList.push(e.target.result as string); // Add image URL to the list
          }
        };
        reader.readAsDataURL(file); // Read file as data URL
      });
    }
  }

  //
 // submitting
  onSubmit() {
    this.updatePropertyObserve();
  }
  // Method to trigger file upload
  triggerFileUpload(fileInput: HTMLInputElement): void {
    fileInput.click();
  }
  // دالة لحذف الصورة
  removeImage(index: number,id:number): void {
    this.imageList.splice(index, 1);
    if(id>0){
      this.imageListForm.splice(index,1);
       this.removeImageList.push(id);
    }
  }
  // sub Categories  Form
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  get subCategoryIds() {
    return this.editOnAd.get('subCategoryIds') as FormArray;
  }

  onCheckboxChange(event: ICategory) {
    //const checkbox = event.target as HTMLInputElement;
    const selectedOptionsFormArray = this.subCategoryIds;
    console.log("done....");
    if (!this.isChecked(event.id)) {
      selectedOptionsFormArray.push(this.fb.control(event.id));
      this.subCategoryNameArray.push(event);
      this.subCategoryNameArrayMap = this.subCategoryNameArray.map(i => i.ar_title);

      console.log("add....");

    }
    else {
      this.deleteItemFromSelect(event.id);
    }

    this.updateSelectedOptions();
  }
  deleteItemFromSelect(id: any) {
    const index = this.subCategoryIds.controls.findIndex(
      control => control.value === id
    );
    this.subCategoryIds.removeAt(index);
    console.log("delete....");
    this.subCategoryNameArray = this.subCategoryNameArray.filter(i => i.id !== id);

    this.subCategoryNameArrayMap = this.subCategoryNameArray.map(i => i.ar_title);


  }

  updateSelectedOptions() {
    const selectedOptionsFormArray = this.editOnAd.get('subCategoryIds') as FormArray;
    this.subCategoryArray = selectedOptionsFormArray.value;
  }

  isChecked(option: number): boolean {
    const selectedOptionsFormArray = this.editOnAd.get('subCategoryIds') as FormArray;
    return selectedOptionsFormArray.value.includes(option);
  }
  onCheckboxChangee(item: ICategory, isChecked: boolean) {

    if (isChecked) {
      this.subCategoryList.push(...item.children);
    }
    else {
      this.subCategoryList = this.subCategoryList.filter(i => i.parent_id != item.id)

      this.subCategoryNameArray = this.subCategoryNameArray.filter((i) =>
        item.children.some((h) => h.id != i.id));
      this.subCategoryNameArrayMap = this.subCategoryNameArray.map(i => i.ar_title);

      this.subCategoryArray = this.subCategoryArray.filter((i) => {
        const shouldDelete = item.children.some((h) => h.id === i);
        if (shouldDelete) {
          this.deleteItemFromSelect(i); // حذف العنصر
          return false; // استبعاده من المصفوفة
        }
        return true; // الاحتفاظ به في المصفوفة




      });
    }
  }

}
