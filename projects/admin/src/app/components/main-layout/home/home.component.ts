import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { StoreData } from '../../ViewModels/HomeVM/store-data';
//import { PromotionAdsService } from '../../Services/Promotion/promotion-ads.service';
import { Subscription } from 'rxjs';

import { HomeService } from './Services/home.service';
import { AuthService } from '../../auth/Services/auth.service';
import { UserDbStoreService } from '../../auth/Services/user-db-store.service';
import { Chart, registerables } from 'chart.js';
import {GoogleMap,GoogleMapsModule, MapMarker} from '@angular/google-maps';
import { error } from 'console';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule,
    GoogleMap, MapMarker,GoogleMapsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  usersCount:number=0;;
  totalPropertiesCount:number=0;
  activePropertiesCount:number=0;
  inactivePropertiesCount:number=0;
  
  stats :any[] = [
    { label: 'العملاء', value: this.usersCount, color: '#054a83' },
    { label: ' العقارات', value: this.totalPropertiesCount, color: '#771414' },
    { label: 'عقارات حالة معلقة', value: this.inactivePropertiesCount, color: '#17a2b8' },
    { label: 'عقارات حالة نشطة', value: this.activePropertiesCount, color: '#069431' },
  ];

  additionalStats = [
    { label: 'معدل الزيارة لهذة الشهر', value: '0%' },
    { label: 'عدد مرات مشاهدة الصفحات', value: '0' },
    { label: 'عدد الزوار', value: 0 },
  ];

  constructor(private homeService:HomeService) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.markerPositions = [
      { lat: 24.7136, lng: 46.6753, }, // الرياض
      { lat: 21.3891, lng: 39.8579 }, // جدة
      { lat: 26.4207, lng: 50.0888 }, // الدمام
      { lat: 21.5169, lng: 39.2192 }, // مكة المكرمة
      { lat: 24.5247, lng: 39.5692 }, // المدينة المنورة
      { lat: 31.5129, lng: 34.4667 }, // تبوك
      { lat: 27.5114, lng: 41.7208 }, // حائل
      { lat: 20.417, lng: 41.5078 },  // أبها
      { lat: 17.6102, lng: 44.113 },  // نجران
      { lat: 18.2161, lng: 42.5053 }, // جازان
      { lat: 29.3697, lng: 47.9732 }, // الجبيل
      { lat: 25.4019, lng: 49.6308 }, // الخبر
      { lat: 26.9898, lng: 49.5738 }, // الأحساء
      { lat: 28.3838, lng: 36.5786 }, // الجوف
      { lat: 24.6333, lng: 46.7167 }  // الخرج
    ];
    this.getAllStatisticsObserve();
  }
// get statistices

  getAllStatisticsObserve() {
    this.homeService.getAllStatistics().subscribe({
      next: (res) => {
        this.usersCount = res.users_count;
        this.totalPropertiesCount = res.total_properties_count;
        this.activePropertiesCount = res.active_properties_count;
        this.inactivePropertiesCount = res.inactive_properties_count;

        this.stats = [
          { label: 'العملاء', value: this.usersCount, color: '#054a83' },
          { label: ' العقارات', value: this.totalPropertiesCount, color: '#771414' },
          { label: 'عقارات حالة معلقة', value: this.inactivePropertiesCount, color: '#17a2b8' },
          { label: 'عقارات حالة نشطة', value: this.activePropertiesCount, color: '#069431' },
        ]

      },
      error: (err) => {
        console.log(err);


      }
    });
  }
  
  center: google.maps.LatLngLiteral = {lat: 24.7136, lng: 46.6753};
  zoom = 6;
  markerPositions: google.maps.LatLngLiteral[] = [];
  
  // markerClustererImagePath =
  //     'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m';

      
  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.markerPositions.push(event.latLng.toJSON());
    }  
    
  }

  createChart() {
    const ctx = document.getElementById('lineChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['ابريل 2024', 'مايو 2024', 'يونيو 2024', 'اكتوبر 2024'],
        datasets: [
          {
            label: 'الزوار',
            data: [500, 1000, 1500, 2000],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
            tension: 0.4,
          },
          {
            label: 'الجلسات',
            data: [300, 700, 1200, 1800],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
        },
        scales: {
          x: { grid: { display: false } },
          y: { grid: { color: '#eaeaea' } },
        },
      },
    });
  }
}
