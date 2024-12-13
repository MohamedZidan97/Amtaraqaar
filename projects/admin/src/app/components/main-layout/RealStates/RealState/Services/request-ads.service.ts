import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../../../auth/Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RequestAdsService {
  private email = new BehaviorSubject<any>("");
  headerOption;
  constructor(private http:HttpClient,private auth:AuthService) {
    this.headerOption = {
      headers: new HttpHeaders({
        'accept': "'/*",
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${this.auth.getToken()}`
      })
    };
   }



  /// get email
  public getEmailFromStore(){
    return this.email.asObservable();
  }

  public setEmailForStore(email:any){
    this.email.next(email);
  }
}
