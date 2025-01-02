import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute,Router, RouterLink } from '@angular/router';
import { PropertyService } from '../Services/property.service';
import { IGetProperties } from '../Models/iget-properties';
import { environment } from '../../../../../Environments/environment.prod';

@Component({
  selector: 'app-show-all-advs',
  standalone: true,
  imports: [DatePipe, CommonModule, FormsModule,RouterLink],
  templateUrl: './show-all-advs.component.html',
  styleUrl: './show-all-advs.component.scss'
})
export class ShowAllAdvsComponent implements OnInit, OnChanges {
  baseUrl:string=environment.baseUrl;
  pageSize = 5;
  currentPage = 0;
  listLength: number = 0
  propertyList : IGetProperties[]=[];
  @Input() isActive : number=1;

  
  constructor(private propertySer:PropertyService
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    this.pageSize;
    this.paginatedData;
  }
  ngOnInit(): void {
    this.paginatedData;
    this.nextPage();
    this.prevPage();
    this.getAllPropertiesObserve();

  }

//                   Property

// get all
getAllPropertiesObserve(){
  this.propertySer.getAllProperties().subscribe({
    next: (res) => {
      this.propertyList = res.data;
      this.propertyList = this.propertyList.map(pro => ({
        id: pro.id,
        images: pro.images.map(file => ({
          path: file.path,
          id:file.id
        })),
        title: pro.title,
        handover:pro.handover,
        number_of_views: 0,
        ad_number: pro.ad_number,
        section:pro.section,
        active:pro.active
      })).filter((pr)=>pr.active);
      

      if(!this.isActive){
        this.propertyList = this.propertyList.filter((pr)=>!pr.active)
      }


      this.listLength = this.propertyList.length;
     // this.packagesList = res.data; // تعيين البيانات المستلمة إلى `packagesList`
      console.log(this.propertyList); // طباعة النتيجة للتأكد
    },
    error: (err) => {
      console.error("Error fetching packages:", err); // التعامل مع الأخطاء
    },

  })
}

propertyId:number=0;
deletePropertyObserve(){
  this.propertySer.deleteProperty(this.propertyId).subscribe(
    { next: (res) => {
      console.log("Property delete successfully:", res);
      this.getAllPropertiesObserve();
     },
     error: (err) => {
       console.error("Error fetching packages:", err); // التعامل مع الأخطاء
     },}
  )
}



 // active ads
 changeActive(){
   if(this.isActive){
    // change to not active
    return;
   }

   // change to active

 }

  // التحكم بعدد الصفوف المعروضة
  get totalPages(): number {
    return Math.ceil(this.listLength / this.pageSize);
  }

  // تغيير الصفحة
  get paginatedData() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    return this.propertyList.slice(start, end);
  }

  nextPage() {
    if ((this.currentPage + 1) * this.pageSize < this.listLength) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }


}
