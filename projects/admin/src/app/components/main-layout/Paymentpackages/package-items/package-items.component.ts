
import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PaymentPackagessService } from '../Services/payment-packagess.service';
import { IPackageItem } from '../Models/ipackage-item';
import { BehaviorSubject,Observable } from 'rxjs';
import { IGetPackageById } from '../Models/iget-package-by-id';
import { DiffOpertService } from '../Services/diff-opert.service';


@Component({
  selector: 'app-package-items',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterLink],
   templateUrl: './package-items.component.html',
  styleUrl: './package-items.component.scss'
})
export class PackageItemsComponent implements OnInit{
  packageItemsSubject: BehaviorSubject<IPackageItem[]> = new  BehaviorSubject<IPackageItem[]>([]);
  packageItems$: Observable<IPackageItem[]> = this.packageItemsSubject.asObservable(); // Observable for template use
  packageItemForm:FormGroup;
  editOnPackageItem:FormGroup;
 
  constructor(private fb: FormBuilder,  private activitedRoute : ActivatedRoute,
    private payService:PaymentPackagessService,private diffOp:DiffOpertService
  ){
   

    this.packageItemForm=this.fb.group({
      title:['',[Validators.required]],
    })

    this.editOnPackageItem=this.fb.group({
      title:['',[Validators.required]],
    })

  }
  packageItemsList: IPackageItem[] = [];
  packageId:number=0;
  ngOnInit(): void {
     this.getPackageItemObserve();
     //this.getPackageByIdObserve();

    // متابعة التغييرات لتحديث قائمة الـ IDs المختارة
   
  }

  
  //                     package Itemss

  // get all package Items
    getPackageItemObserve(){
       this.payService.getPackageItems().subscribe({
      next: (res) => {
        this.packageItemsSubject.next(res); // Update BehaviorSubject
        console.log(this.packageItems$); // طباعة النتيجة للتأكد
        this.diffOp.getItems(res);
      },
      error: (err) => {
        console.error("Error fetching packages:", err); // التعامل مع الأخطاء
      },
    })
    }

    // add package Item
    addPackageItemObserve(){
      if (this.packageItemForm.valid) {
        const formValue = this.packageItemForm.value;
        const newItem:any = { ar_title: formValue.title, en_title: formValue.title };
  
        this.payService.addPackageItem(newItem).subscribe({
          next: () => {
            this.getPackageItemObserve();
            this.packageItemForm.reset(); // Reset the form
          },
          error: (err) => {
            console.error('Error adding package item:', err);
          },
        });
      }
    }

    onSubmitPackageItem(){
      this.addPackageItemObserve();
    }

    // update 
    itemId:number=0
    updatePackageItemObserve(){
      if (this.editOnPackageItem.valid) {
        const formValue = this.editOnPackageItem.value;
        const editItem:any = { ar_title: formValue.title, en_title: formValue.title };
  
        this.payService.updatePackageItem(this.itemId,editItem).subscribe({
          next: () => {
            this.getPackageItemObserve();
            this.editOnPackageItem.reset(); // Reset the form
            console.log("Done")
          },
          error: (err) => {
            console.error('Error adding package item:', err);
          },
        });
      }
    }

    onSubmitEditOnPackageItem(){
     this.updatePackageItemObserve();
    }

    // Delete
    deletePackageItemObserve(){
      this.payService.deletePackageItem(this.itemId).subscribe({
        next: () => {
          this.getPackageItemObserve();
          console.log("Done")
        },
        error: (err) => {
          console.error('Error adding package item:', err);
        },
      });
    }

}
