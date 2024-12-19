import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PaymentPackagessService } from '../Services/payment-packagess.service';
import { IPackageItem } from '../Models/ipackage-item';
import { BehaviorSubject, Observable } from 'rxjs';
import { IGetPackageById } from '../Models/iget-package-by-id';
import { PackageItemsComponent } from "../package-items/package-items.component";
import { ShowAllPackagesComponent } from '../show-all-packages/show-all-packages.component';
import { DiffOpertService } from '../Services/diff-opert.service';
import { IAddPackage } from '../Models/iadd-package';


@Component({
  selector: 'app-edit-on-package',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, PackageItemsComponent],
  templateUrl: './edit-on-package.component.html',
  styleUrl: './edit-on-package.component.scss'
})
export class EditOnPackageComponent implements OnInit {
  packageForm: FormGroup;
  packageItemsList: IPackageItem[] = [];
  packageId: number = 0;
  selectedIds:number[]=[];
  constructor(private fb: FormBuilder, private activitedRoute: ActivatedRoute,
    private payService: PaymentPackagessService,private diffOp:DiffOpertService,
    private router:Router
  ) {
    this.packageForm = this.fb.group({
      title: [''],
      description: [''],
      packageType: [''],
      price: ['',Validators.required],
      packageFeatures: fb.array([])
    });
  }



  ngOnInit(): void {
    this.packageId = Number(this.activitedRoute.snapshot.paramMap.get('packageId'));
    this.getPackageByIdObserve();
  }
  // Getter للمصفوفة
  get packageFeatures() {
    return this.packageForm.get('packageFeatures') as FormArray;
  }
 // mappedPackage: IGetPackageById = {} as IGetPackageById;
  //                       Packages
  // getPackageItemObserve() {
  //   this.payService.getPackageItems().subscribe({
  //     next: (res) => {
  //       this.packageItemsList = res; // Update BehaviorSubject
  //       this.packageItemsList.forEach((feature) => {
  //         this.packageFeatures.push(this.fb.control(false)); // استخدم القيمة المناسبة
  //       });
  //       console.log("done: ", res);
  //     },
  //     error: (err) => {
  //       console.error("Error fetching packages:", err); // التعامل مع الأخطاء
  //     },
  //   })
  // }

  getPackageByIdObserve() {
    this.payService.getPackageById(this.packageId).subscribe(
      {
        next: (res) => {
          const data = res.data; // استخراج البيانات من res.data
          const mappedPackage: IGetPackageById = {
            en_title: data.en_title,
            ar_title: data.ar_title,
            ar_description: data.ar_description,
            type: data.type,
            price: data.price,
            package_items: data.package_items.map((item: any) => ({
              id: item.id,
              ar_title: item.ar_title,
            })),

          };
          this.getDataInForm(mappedPackage);
          this.diffOp.getloggedStatus().subscribe({
            next: (res) => {
              this.packageItemsList = res; // Update BehaviorSubject
              this.packageItemsList.forEach((feature) => {
                const isSelected = mappedPackage.package_items.some((item: any) => item.id === feature.id); // التحقق من التحديد
                this.packageFeatures.push(this.fb.control(isSelected)); // إضافة FormControl
              });
              console.log("done: ", res);
          }});
          console.info('Successful Get:', mappedPackage);

          //this.packageDetails = mappedPackage; // تخزين البيانات
        },
        error: (err) => {
          console.error("Error fetching packages1:", err); // التعامل مع الأخطاء
        },
      }
    )
  }
  getDataInForm(model:IGetPackageById){
    this.packageForm.patchValue({
      title: model.en_title,
      description: model.ar_description,
      packageType: model.type,
      price: model.price,
    });
  }

  updatePackageObserve(){
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
      this.payService.updatePackage(this.packageId,packageData).subscribe(
      {
       next: (response) => {
          this.packageForm.reset();
          this.router.navigate(['/ShowAllPackages']);
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
  onSubmitPackages() {
    this.updatePackageObserve();
  }






}
