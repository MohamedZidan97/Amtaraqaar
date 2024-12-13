import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DetailsOfPropertyService } from '../Services/details-of-property.service';
import { ICategory } from '../Models/icategory';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-control-on-features',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './control-on-features.component.html',
  styleUrl: './control-on-features.component.scss'
})
export class ControlOnFeaturesComponent {
  featureForm: FormGroup;
  editOnFeature: FormGroup;
  featureId: number = 0;
  featureList: ICategory[] = [];


  constructor(private fb: FormBuilder, private detailsOfProp: DetailsOfPropertyService) {


    this.featureForm = this.fb.group({
      title: ['', [Validators.required]],
    })

    this.editOnFeature = this.fb.group({
      title: ['', [Validators.required]],
    })
    
  }
  ngOnInit(): void {
    this.getFeaturesObserve();
  }




  getFeaturesObserve() {
    this.detailsOfProp.getAllFeatures().subscribe({
      next: (res) => {
        this.featureList = res.data;
        console.log("Successfull Getting", this.featureList)
      },
      error: (err) => {
        console.error("Failed Getting:", err)
      }
    })
  }
  // add package Item
  addFeatureObserve() {
    if (this.featureForm.valid) {
      const formValue = this.featureForm.value;
      const newItem: any = { ar_title: formValue.title };

      this.detailsOfProp.addFeature(newItem).subscribe({
        next: () => {
          this.getFeaturesObserve();
          this.featureForm.reset(); // Reset the form
        },
        error: (err) => {
          console.error('Error adding package item:', err);
        },
      });
    }
  }
  // update 
  updateFeatureObserve(){
    if (this.editOnFeature.valid) {
      const formValue = this.editOnFeature.value;
      const editItem:any = { ar_title: formValue.title};

      this.detailsOfProp.updateFeature(this.featureId,editItem).subscribe({
        next: () => {
          this.getFeaturesObserve();
          this.editOnFeature.reset(); // Reset the form
          console.log("Done")
        },
        error: (err) => {
          console.error('Error adding package item:', err);
        },
      });
    }
  }
  deleteFeatureObserve() {
    this.detailsOfProp.deleteFeature(this.featureId).subscribe({
        next: () => {
          this.getFeaturesObserve();
          this.featureForm.reset(); // Reset the form
        },
        error: (err) => {
          console.error('Error adding package item:', err);
        },
      });
  }

  onSubmitFeatureItem() {
    this.addFeatureObserve();
  }

  onSubmitEditOnFeature() {
this.updateFeatureObserve();
  }
}
