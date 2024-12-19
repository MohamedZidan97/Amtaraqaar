import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailsOfPropertyService } from '../../../DetailsOfProperities/Services/details-of-property.service';
import { ICategory } from '../../../DetailsOfProperities/Models/icategory';
import { environment } from '../../../../../Environments/environment.prod';
import { PropertyService } from '../../RealState/Services/property.service';
import { IGetPropertyById } from '../../RealState/Models/iget-property-by-id';

@Component({
  selector: 'app-try-to-reacive-to-the-best',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './try-to-reacive-to-the-best.component.html',
  styleUrl: './try-to-reacive-to-the-best.component.scss'
})
export class TryToReaciveToTheBestComponent {
  baseUrl: string = environment.baseUrl;

  imageList: string[] = [];
  imageListForm: { url: string, alt: string }[] = [];

  proFtsList: { name: string, flag: boolean }[] = [
    { name: 'واى فاى', flag: false },
    { name: 'صاله', flag: true },
    { name: 'واى ', flag: false }]


  categoryList: ICategory[] = [];
  subCategoryList: ICategory[] = [];
  featureList: ICategory[] = [];

  //featureList: { id: number, name: string }[] = [];
  dropdownOpen = false;

  editOnAd: FormGroup;
  propertyId: number = 0;
  subCategoryArray: number[] = []
  subCategoryNameArray: ICategory[] = []
  subCategoryNameArrayMap: string[] = []

  constructor(private fb: FormBuilder, private activitedRoute: ActivatedRoute,
    private router: Router, private propertySer: PropertyService,
    private detailSer: DetailsOfPropertyService) {
    this.editOnAd = this.fb.group({
      title: [''],
      description: [''],
      images: fb.array([]),
      city: [''],
      governorate: [''],
      district: [''],
      location: [''],
      room: [''],
      bathroom: [''],
      floor: [''],
      area: [''],
      price: [''],
      section: [''],
      status: [''],
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

  // get by id 
  getPropertyByIdObserve() {
    this.propertySer.getPropertyById(this.propertyId).subscribe(
      {
        next: (res) => {
          const data = res.data; // استخراج البيانات من res.data
          const mappedProperty: IGetPropertyById = {
            title: data.title,
            description: data.description,
            status: data.section,
            price: data.price,
            section: data.section,
            categoryIds: [5],
            room: data.room,
            bathroom: data.bathroom, floor: data.floor,
            area: 2,
            advertiser_type: data.advertiser_type,
            location: data.location, active: data.active,
            media_files: data.media_files.map((item: any) => ({
              url: item.url,
              alt: item.alt,
            })),
            subCategoryIds: [9, 10], featureIds: [1],
            cityId: data.cityId, cityName: data.cityName,
            governorateId: data.governorateId, governorateName: data.governorateName,
            districtId: data.districtId, districtName: data.districtName
          }
          this.imageListForm = mappedProperty.media_files;
          this.subCategoryArray = mappedProperty.subCategoryIds;
          this.getDataInForm(mappedProperty);
          this.detailSer.getAllCategories().subscribe({
            next: (res) => {
              this.categoryList = res.data; // Update BehaviorSubject

              this.categoryList.forEach((feature) => {
                const isSelected = mappedProperty.categoryIds.some((item: any) => item === feature.id); // التحقق من التحديد
                console.log(feature.id, isSelected);
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
                console.log(feature.id, isSelected);
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
      title: data.title,
      description: data.description,
      status: data.status,
      price: data.price,
      section: data.section,
      categoryIds: data.categoryIds,
      room: data.room,
      bathroom: data.bathroom, floor: data.floor, area: data.area,
      advertiser_type: data.advertiser_type,
      location: data.location, active: data.active,
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
        console.log(selectIdCat)

      // sub category
      const selectIdSubCat = this.subCategoryArray;
      console.log(selectIdSubCat)
      // feature
      const selectIdFeat = this.featureList
        .map((item, index) => (data.featureIds[index] ? item.id : null))
        .filter((id) => id !== null) as number[];
        console.log(selectIdFeat);


      // image

      // إعداد بيانات الـ IAddPackage
      const packageData: any = {
        title: data.title,
       // description: data.description,
      //  status: data.status,

        price: data.price,
        address:"fsfs",
         img:this.fileList,
       // images:this.fileListt,
        section: data.section,
        spaces:"fsd",
        room: data.room,
        bathroom: data.bathroom,
        floor: data.floor,
        // area: data.area,
      };
      console.log(packageData);

      // إرسال البيانات إلى الـ API
      this.propertySer.updateProperty(this.propertyId, packageData).subscribe(
        {
          next: (response) => {
            this.editOnAd.reset();
            this.router.navigate(['/ShowAllAdvs']);
            console.log('Package added successfully:', response);

          },
          error: (error) => {
            console.error('Error adding package:', error);
          }
        }
      );
    } else {
      console.error('Form is invalid!');
    }


  }


  //                         Property Features  

  // submitting
  onSubmit() {
    
   this.updatePropertyObserve();
  }

  // Method to trigger file upload
  triggerFileUpload(fileInput: HTMLInputElement): void {
    fileInput.click();
  }
  fileList = new FormData(); 
  // Method to handle file selection
  onFileSelected(event: any): void {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      const fileTarget = event.currentTarget.files[0];
      this.fileList.append('img',fileTarget);

      console.log("done....",fileTarget);
      Array.from(input.files).forEach((file) => {
        //this.fileListt.push(file);
       // console.log(this.fileList.get('file'));
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

