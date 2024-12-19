import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
  pageSize = 3;
  currentPage = 0;
  listLength: number = 0
  propertyList : IGetProperties[]=[];
  data = [
    {
      image: 'https://via.placeholder.com/50', // صورة تجريبية
      ar_title: 'العنوان الأول',
      views: 150,
      unique_id: '12345',
      creation_date: new Date(2023, 10, 15), // تاريخ 15 نوفمبر 2023
      status: 'active',
    },
    {
      image: 'https://via.placeholder.com/50',
      ar_title: 'العنوان الثاني',
      views: 200,
      unique_id: '12346',
      creation_date: new Date(2023, 9, 20), // تاريخ 20 أكتوبر 2023
      status: 'inactive',
    },
    {
      image: 'https://via.placeholder.com/50',
      ar_title: 'العنوان الثالث',
      views: 300,
      unique_id: '12347',
      creation_date: new Date(2023, 8, 10), // تاريخ 10 سبتمبر 2023
      status: 'active',
    },
    {
      image: 'https://via.placeholder.com/50',
      ar_title: 'العنوان الثاني',
      views: 200,
      unique_id: '12346',
      creation_date: new Date(2023, 9, 20), // تاريخ 20 أكتوبر 2023
      status: 'inactive',
    },
    {
      image: 'https://via.placeholder.com/50',
      ar_title: 'العنوان الثالث',
      views: 300,
      unique_id: '12347',
      creation_date: new Date(2023, 8, 10), // تاريخ 10 سبتمبر 2023
      status: 'active',
    },
    {
      image: 'https://via.placeholder.com/50',
      ar_title: 'العنوان الثاني',
      views: 200,
      unique_id: '12346',
      creation_date: new Date(2023, 9, 20), // تاريخ 20 أكتوبر 2023
      status: 'inactive',
    },
    {
      image: 'https://via.placeholder.com/50',
      ar_title: 'العنوان الثالث',
      views: 300,
      unique_id: '12347',
      creation_date: new Date(2023, 8, 10), // تاريخ 10 سبتمبر 2023
      status: 'active',
    },
    {
      image: 'https://via.placeholder.com/50',
      ar_title: 'العنوان الثاني',
      views: 200,
      unique_id: '12346',
      creation_date: new Date(2023, 9, 20), // تاريخ 20 أكتوبر 2023
      status: 'inactive',
    },
    {
      image: 'https://via.placeholder.com/50',
      ar_title: 'العنوان الثالث',
      views: 300,
      unique_id: '12347',
      creation_date: new Date(2023, 8, 10), // تاريخ 10 سبتمبر 2023
      status: 'active',
    },
  ];
  constructor(private propertySer:PropertyService
  ) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.pageSize;
    this.paginatedData;
  }
  ngOnInit(): void {
    this.data;
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
        media_files: pro.media_files.map(file => ({
          url: file.url,
          alt: file.alt
        })),
        title: pro.title,
        handover:pro.handover,
        number_of_views: 0,
        ad_number: pro.ad_number,
        status: pro.status,
        section:pro.section
      }));
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
