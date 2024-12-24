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
  selector: 'app-add-property',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.scss'
})
export class AddPropertyComponent {
  baseUrl: string = environment.baseUrl;
  imageList: string[] = [];
  imageListForm: { id:number, url: string, alt: string }[] = [];
  categoryList: ICategory[] = [];
  subCategoryList: ICategory[] = [];
  featureList: ICategory[] = [];
  dropdownOpen = false;
  editOnAd: FormGroup;
  propertyId: number = 0;
  subCategoryArray: number[] = []
  subCategoryNameArray: ICategory[] = []
  subCategoryNameArrayMap: string[] = []
  deleteImagesIds:number[]=[];


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
      spaces: [''],
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
    this. getDetailsObserve();
  }
  //

  get categoryIds() {
    return this.editOnAd.get('categoryIds') as FormArray;
  }

  get featureIds() {
    return this.editOnAd.get('featureIds') as FormArray;
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
     // console.log(selectIdCat)

      // sub category
      const selectIdSubCat = this.subCategoryArray;
      //console.log(selectIdSubCat)
      // feature
      const selectIdFeat = this.featureList
        .map((item, index) => (data.featureIds[index] ? item.id : null))
        .filter((id) => id !== null) as number[];
      //console.log(selectIdFeat);

      const packageData: any = {
        title: data.title,
        description: data.description,
        price: data.price,
        address: data.location,
        section: data.section,
        spaces: data.spaces as Number,
        room: data.room as String,
        bathroom: data.bathroom as String,
        floor: data.floor as String,
      };
      console.log(packageData);

      // إرسال البيانات إلى الـ API
      this.propertySer.addProperty(packageData).subscribe(
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

   // this.addImagesOfPropertyObserve(this.uploadImages);
  }

  addImagesOfPropertyObserve(){
    const existingImageIds: number[] = [18]; // You might want to get this from an input
    const formData = new FormData();

    // Append files to FormData
  if (this.uploadImages.length > 0) {
    const file = this.uploadImages;
    formData.append('images',JSON.stringify( file));
 
    }

    // Append existing image IDs
    formData.append('existing_image_ids', JSON.stringify(existingImageIds));

  console.log('FormData content:', formData.get('images'));
    
    this.propertySer.addImagesOfProperty(formData,this.propertyId).subscribe({
      next: (response) => {

       console.log("Done Upload Images",this.uploadImages);
      },
      error: (error) => {
        console.error('Error adding package:', error);
      }
    })
  }

  //                         Property Features  

 
 //uploadImages:FormData = new FormData();
  uploadImages: File[]=[];
  // Method to handle file selection
  onFileSelected(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach((file) => {
        this.uploadImages.push(file);

    //   this.uploadImages.push({file:file,fileName:file.name});
       console.log("inside", this.uploadImages);
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target?.result) {
            this.imageList.push(e.target.result as string); // Add image URL to the list
          }
       
        };

      this.addImagesOfPropertyObserve();

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
  removeImage(index: number,id:number): void {
    this.imageList.splice(index, 1);
    if(id>0)
    this.deleteImagesIds.push(id);

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
