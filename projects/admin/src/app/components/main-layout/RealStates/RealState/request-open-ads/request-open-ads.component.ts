import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RequestAdsService } from '../Services/request-ads.service';

@Component({
  selector: 'app-request-open-ads',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './request-open-ads.component.html',
  styleUrl: './request-open-ads.component.scss'
})
export class RequestOpenAdsComponent implements OnInit ,OnChanges{
  pageSize = 3;
  currentPage = 0;
  listLength:number=0
  data:any;
  constructor(private req:RequestAdsService){
    this.data = [
      { id: 1, name: 'Tiger Nixon', position: 'System Architect', office: 'Edinburgh', image: 'https://via.placeholder.com/50', date: '2023-10-01' },
      { id: 2, name: 'Garrett Winters', position: 'Accountant', office: 'Tokyo', image: 'https://via.placeholder.com/50', date: '2023-09-15' },
      { id: 3, name: 'Ashton Cox', position: 'Junior Technical Author', office: 'San Francisco', image: 'https://via.placeholder.com/50', date: '2023-08-20' },
      { id: 4, name: 'Cedric Kelly', position: 'Senior Javascript Developer', office: 'Edinburgh', image: 'https://via.placeholder.com/50', date: '2023-11-05' },
      { id: 5, name: 'Airi Satou', position: 'Accountant', office: 'Tokyo', image: 'https://via.placeholder.com/50', date: '2023-10-10' },
      { id: 1, name: 'Tiger Nixon', position: 'System Architect', office: 'Edinburgh', image: 'https://via.placeholder.com/50', date: '2023-10-01' },
      { id: 2, name: 'Garrett Winters', position: 'Accountant', office: 'Tokyo', image: 'https://via.placeholder.com/50', date: '2023-09-15' },
      { id: 3, name: 'Ashton Cox', position: 'Junior Technical Author', office: 'San Francisco', image: 'https://via.placeholder.com/50', date: '2023-08-20' },
      { id: 4, name: 'Cedric Kelly', position: 'Senior Javascript Developer', office: 'Edinburgh', image: 'https://via.placeholder.com/50', date: '2023-11-05' },
      { id: 5, name: 'Airi Satou', position: 'Accountant', office: 'Tokyo', image: 'https://via.placeholder.com/50', date: '2023-10-10' },
      { id: 1, name: 'Tiger Nixon', position: 'System Architect', office: 'Edinburgh', image: 'https://via.placeholder.com/50', date: '2023-10-01' },
      { id: 2, name: 'Garrett Winters', position: 'Accountant', office: 'Tokyo', image: 'https://via.placeholder.com/50', date: '2023-09-15' },
      { id: 3, name: 'Ashton Cox', position: 'Junior Technical Author', office: 'San Francisco', image: 'https://via.placeholder.com/50', date: '2023-08-20' },
      { id: 4, name: 'Cedric Kelly', position: 'Senior Javascript Developer', office: 'Edinburgh', image: 'https://via.placeholder.com/50', date: '2023-11-05' },
      { id: 5, name: 'Airi Satou', position: 'Accountant', office: 'Tokyo', image: 'https://via.placeholder.com/50', date: '2023-10-10' },
    
    ];

   
  }
  ngOnChanges(changes: SimpleChanges): void {
   this.pageSize;
   this.paginatedData;
   
  }
  
  ngOnInit(): void {
    this.paginatedData;
    this.nextPage();
    this. prevPage();
    this.listLength=this.data.length;
  }
  // متغير لتحديد حالة الفرز (تصاعدي أو تنازلي)
isAscending = true;

// دالة الفرز حسب التاريخ
sortByDate() {
  this.isAscending = !this.isAscending; // عكس حالة الفرز
  this.data.sort((a:any, b:any) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return this.isAscending ? dateA - dateB : dateB - dateA;
  });
}

  // التحكم بعدد الصفوف المعروضة
  get totalPages(): number {
    return Math.floor(this.data.length / this.pageSize);
  }

  // تغيير الصفحة
  get paginatedData() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    return this.data.slice(start, end);
  }

  nextPage() {
    if ((this.currentPage + 1) * this.pageSize < this.data.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }



  
  // العمليات
  deleteRow(index: number) {
    this.data.splice(index, 1);
  }

  editRow(row: any) {
    alert(`Editing: ${row.name}`);
  }

}
