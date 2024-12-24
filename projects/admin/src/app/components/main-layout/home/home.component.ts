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


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  stats = [
    { label: 'العملاء', value: 32, color: '#0d6efd' },
    { label: 'العقارات منتهية الصلاحية', value: 4, color: '#dc3545' },
    { label: 'الحالة معلقة', value: 0, color: '#17a2b8' },
    { label: 'الحالة نشطة', value: 60, color: '#6f42c1' },
  ];

  additionalStats = [
    { label: 'Bounce Rate', value: '312%' },
    { label: 'عدد مرات مشاهدة الصفحة', value: '1,921' },
    { label: 'Visitors', value: 414 },
  ];

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.createChart();
  }

  createChart() {
    const ctx = document.getElementById('lineChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Apr 2024', 'May 2024', 'Jun 2024', 'Oct 2024'],
        datasets: [
          {
            label: 'Visitors',
            data: [500, 1000, 1500, 2000],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
            tension: 0.4,
          },
          {
            label: 'Sessions',
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
