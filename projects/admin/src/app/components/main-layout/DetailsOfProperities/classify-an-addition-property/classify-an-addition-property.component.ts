import { Component, OnInit } from '@angular/core';
import { ControlOnFeaturesComponent } from "../control-on-features/control-on-features.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ICategory } from '../Models/icategory';
import { DetailsOfPropertyService } from '../Services/details-of-property.service';

@Component({
  selector: 'app-classify-an-addition-property',
  standalone: true,
  imports: [ControlOnFeaturesComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './classify-an-addition-property.component.html',
  styleUrl: './classify-an-addition-property.component.scss'
})
export class ClassifyAnAdditionPropertyComponent implements OnInit {
  categoryForm: FormGroup;
  editOnCategory: FormGroup;
  categoryId: number = 0;
  categoryList: ICategory[] = [];
  subCategoryList: ICategory[] = [];


  constructor(private fb: FormBuilder, private detailsOfProp: DetailsOfPropertyService) {


    this.categoryForm = this.fb.group({
      title: ['', [Validators.required]],
    })

    this.editOnCategory = this.fb.group({
      title: ['', [Validators.required]],
    })
    
  }
  ngOnInit(): void {
    this.getCategoriesObserve();
  }




  getCategoriesObserve() {
    this.detailsOfProp.getAllCategories().subscribe({
      next: (res) => {
        this.categoryList = res.data;
        console.log("Successfull Getting", this.categoryList)
      },
      error: (err) => {
        console.error("Failed Getting:", err)
      }
    })
  }
  // add package Item
  addCategoryObserve() {
    if (this.categoryForm.valid) {
      const formValue = this.categoryForm.value;
      const newItem: any = { ar_title: formValue.title };

      this.detailsOfProp.addCategory(newItem).subscribe({
        next: () => {
          this.getCategoriesObserve();
          this.categoryForm.reset(); // Reset the form
        },
        error: (err) => {
          console.error('Error adding package item:', err);
        },
      });
    }
  }
  // update 
  updateCategoryObserve(){
    if (this.editOnCategory.valid) {
      const formValue = this.editOnCategory.value;
      const editItem:any = { ar_title: formValue.title};

      this.detailsOfProp.updateCategory(this.categoryId,editItem).subscribe({
        next: () => {
          this.getCategoriesObserve();
          this.editOnCategory.reset(); // Reset the form
          console.log("Done")
        },
        error: (err) => {
          console.error('Error adding package item:', err);
        },
      });
    }
  }
  deleteCategoryObserve() {
    this.detailsOfProp.deleteCategory(this.categoryId).subscribe({
        next: () => {
          this.getCategoriesObserve();
          this.categoryForm.reset(); // Reset the form
        },
        error: (err) => {
          console.error('Error adding package item:', err);
        },
      });
  }

  onSubmitCategoryItem() {
    this.addCategoryObserve();
  }

  onSubmitEditOnCategory() {
this.updateCategoryObserve();
  }


  //    SubCategory
  chooseCatId=0;

  onSubmitSubCategoryItem(){
    if (this.categoryForm.valid) {
      const formValue = this.categoryForm.value;
      const newItem: any = { ar_title: formValue.title,parent_id:this.chooseCatId};

      this.detailsOfProp.addCategory(newItem).subscribe({
        next: () => {
          this.getCategoriesObserve();
          this.categoryForm.reset(); // Reset the form
        },
        error: (err) => {
          console.error('Error adding package item:', err);
        },
      });
    }
  }

}
