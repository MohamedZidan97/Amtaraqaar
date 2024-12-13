import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { StoreData } from '../../ViewModels/HomeVM/store-data';
//import { PromotionAdsService } from '../../Services/Promotion/promotion-ads.service';
import { Subscription } from 'rxjs';

import { HomeService } from './Services/home.service';
import { AuthService } from '../../auth/Services/auth.service';
import { UserDbStoreService } from '../../auth/Services/user-db-store.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  public role!: string;

  public fullName: string = "";
  
  private adsSubscribe!: Subscription;
  constructor(private authService: AuthService, private homeSer:HomeService,private userStore:UserDbStoreService) {

  }

  ngOnInit(): void {
 this.userStore.getFullNameFromStore().subscribe(res => {
      const fullNameFromToken = this.authService.getName()||"";
      this.fullName = res || fullNameFromToken;
    });
    
    this.userStore.getEmailFromStore()
      .subscribe(val => {
        const roleFromToken = this.authService.getEmail()||"";
        this.role = val || roleFromToken;
      });

    //  this.getDep();
   
  }


//  getDep(){
//   return this.homeSer.getAllProducts().subscribe(res=>res);
//  }
  logOut() {
    this.authService.logOut();
  }

}
