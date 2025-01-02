import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../Services/property.service';
import { IGetPropertyById } from '../Models/iget-property-by-id';
import { DetailsOfPropertyService } from '../../../DetailsOfProperities/Services/details-of-property.service';
import { ICategory } from '../../../DetailsOfProperities/Models/icategory';
import { environment } from '../../../../../Environments/environment.prod';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.scss'
})
export class AddPropertyComponent {
  imageList: string[] = [];
  categoryList: ICategory[] = [];
  subCategoryList: ICategory[] = [];
  featureList: ICategory[] = [];
  dropdownOpen = false;
  editOnAd: FormGroup;
  propertyId: number = 0;
  subCategoryArray: number[] = []
  subCategoryNameArray: ICategory[] = []
  subCategoryNameArrayMap: string[] = []
  locationUrl: string | null = null;


  constructor(private fb: FormBuilder, private activitedRoute: ActivatedRoute,
    private router: Router, private propertySer: PropertyService,
    private detailSer: DetailsOfPropertyService,private toastr:ToastrService) {
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
      typeOfProperty:['unit'],
      featureIds: fb.array([]), //array of checkBox
      categoryIds: fb.array([]), // array of checkBok
      subCategoryIds: fb.array([]) // array of checkBok
    })
  }
  // sub Categories  Form

  ngOnInit(): void {
    this. getDetailsObserve();
  }

  // location 
  getCurrentLocation(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // إنشاء رابط Google Maps باستخدام الإحداثيات
          this.locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
        },
        (error) => {
          console.error('حدث خطأ أثناء تحديد الموقع:', error);
          alert('تعذر تحديد الموقع. الرجاء التحقق من إعدادات المتصفح.');
        }
      );
    } else {
      alert('تحديد الموقع غير مدعوم في هذا المتصفح.');
    }
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

  getDetailsObserve(){
    this.detailSer.getAllCategories().subscribe({
      next: (res) => {
        this.categoryList = res.data; // Update BehaviorSubject
        this.categoryList.forEach((feature) => {
       //   console.log(feature.id, isSelected);
          this.categoryIds.push(this.fb.control(false)); // إضافة FormControl

         
        });
      },
      error: (err) => {
        console.error("Error fetching prop:", err); // التعامل مع الأخطاء
      },
    });

    this.detailSer.getAllFeatures().subscribe({
      next: (res) => {
        this.featureList = res.data; // Update BehaviorSubject
        this.featureList.forEach((feature) => {
         // console.log(feature.id, isSelected);
          this.featureIds.push(this.fb.control(false)); // إضافة FormControl

        });
      },
      error: (err) => {
        console.error("Error fetching prop:", err); // التعامل مع الأخطاء
      }
    }
    )
  }
   
  //update
  addPropertyObserve() {
    if (this.editOnAd.valid) {
      const data = this.editOnAd.value;
      // category
      const selectIdCat = this.categoryList
        .map((item, index) => (data.categoryIds[index] ? item.id : null))
        .filter((id) => id !== null) as number[];
      // sub category
      const selectIdSubCat = this.subCategoryArray;
      // feature
      const selectIdFeat = this.featureList
        .map((item, index) => (data.featureIds[index] ? item.id : null))
        .filter((id) => id !== null) as number[];

      
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
      this.uploadImages.forEach((file)=>{
        formData.append("images[]",file);
      })
      selectIdFeat.forEach((id)=>{
        formData.append("features_ids[]",id.toString());
      })
      selectIdCat.forEach((id)=>{
        formData.append("category_ids[]",id.toString());

      })
      selectIdSubCat.forEach((id)=>{
        formData.append("sub_category_ids[]",id.toString());
      })
      // إرسال البيانات إلى الـ API
      this.propertySer.addProperty(formData).subscribe(
        {
          next: (response) => {
            this.editOnAd.reset();
            this.router.navigate(['/ShowAllAdvs']);
            this.toastr.success("Property added successfully:", "Success");
            console.log('Package added successfully:', response);
          },
          error: (error) => {
            console.error('Error adding property:', error);
          }
        }
      );

      
    } else {
      console.error('Form is invalid!');
    }
  }


  //                         Property Features  

 
 //uploadImages:FormData = new FormData();
  uploadImages: File[]=[];
  // Method to handle file selection
  onFileSelected(event: any): void {
    const input = event.target as HTMLInputElement;
    this.uploadImages = Array.from(event.target.files);
    if (input.files) {
      Array.from(input.files).forEach((file) => {
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

    this.addPropertyObserve();
  }

  // Method to trigger file upload
  triggerFileUpload(fileInput: HTMLInputElement): void {
    fileInput.click();
  }

  // دالة لحذف الصورة
  removeImage(index: number): void {
    this.imageList.splice(index, 1);
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
    if (!this.isChecked(event.id)) {
      selectedOptionsFormArray.push(this.fb.control(event.id));
      this.subCategoryNameArray.push(event);
      this.subCategoryNameArrayMap = this.subCategoryNameArray.map(i => i.ar_title);
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
