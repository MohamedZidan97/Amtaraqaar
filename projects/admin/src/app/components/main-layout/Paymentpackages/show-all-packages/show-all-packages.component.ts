import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PaymentPackagessService } from '../Services/payment-packagess.service';
import { IPackages } from '../Models/ipackages';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IPackageItem } from '../Models/ipackage-item';
import { IAddPackage } from '../Models/iadd-package';
import { DiffOpertService } from '../Services/diff-opert.service';

@Component({
  selector: 'app-show-all-packages',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './show-all-packages.component.html',
  styleUrl: './show-all-packages.component.scss'
})
export class ShowAllPackagesComponent implements OnInit {
  packagesList: IPackages[] = []; // تعديل نوع البيانات ليكون مصفوفة
  packageForm: FormGroup;

  packageItemsList: IPackageItem[] = [];
  selectedIds: number[] = []; // العناصر المختارة
  constructor(private payService: PaymentPackagessService, private fb: FormBuilder,
    private diffOp: DiffOpertService
  ) {
    this.packageForm = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      packageType: [''],
      price: [''],
      packageFeatures: fb.array([]), //array of checkBox
      logo: ['']
    });
  }
 
  ngOnInit(): void {
    this.getPackagesObserve();
    this.getPackageItemObserve();
  }

 
    // Getter للمصفوفة
    get packageFeatures() {
      return this.packageForm.get('packageFeatures') as FormArray;
    }

  getPackagesObserve() {
    this.payService.getAllPackages().subscribe({
      next: (res) => {
        this.packagesList = res.data; // تعيين البيانات المستلمة إلى `packagesList`
        console.log(this.packagesList); // طباعة النتيجة للتأكد
      },
      error: (err) => {
        console.error("Error fetching packages:", err); // التعامل مع الأخطاء
      },
    });
  }
  getPackageItemObserve() {
    this.payService.getPackageItems().subscribe({
      next: (res) => {
        this.packageItemsList = res; // Update BehaviorSubject
        this.packageItemsList.forEach(feature =>
          this.packageFeatures.push(this.fb.control(false)) // استخدام القيمة الافتراضية
        );
        this.diffOp.getItems(this.packageItemsList);
      },
      error: (err) => {
        console.error("Error fetching packages:", err); // التعامل مع الأخطاء
      },
    })
  }

  addPackageObserve() {

    if (this.packageForm.valid) {

      const formValue = this.packageForm.value;

      this.selectedIds = this.packageItemsList
      .map((item, index) => (formValue.packageFeatures[index] ? item.id : null))
      .filter((id) => id !== null) as number[];

      // إعداد بيانات الـ IAddPackage
      const packageData: IAddPackage = {
        ar_title: formValue.title,
        en_title:formValue.title,
        ar_description: formValue.description,
        package_type: formValue.packageType,
        price: +formValue.price,
        package_item_ids: this.selectedIds,
       
      };

      // إرسال البيانات إلى الـ API
      this.payService.addPackage(packageData).subscribe(
        (response) => {
          this.packageForm.reset();
          this.getPackagesObserve();
          console.log('Package added successfully:', response);
        },
        (error) => {
          console.error('Error adding package:', error);
        }
      
      );
      this.getPackagesObserve();

    } else {
      console.error('Form is invalid!');
    }
  }
  packageId:number=0;
  deletePackageObserve(){
   this.payService.deletePackage(this.packageId).subscribe({ next: (res) => {
   console.info("Package added successfully:", res);
   this.getPackagesObserve();
  },
  error: (err) => {
    console.error("Error fetching packages:", err); // التعامل مع الأخطاء
  },})
  }
  onSubmitPackages() {
    this.addPackageObserve();
  }
}
