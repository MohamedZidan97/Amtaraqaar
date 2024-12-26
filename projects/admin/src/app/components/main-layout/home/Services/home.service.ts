import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../auth/Services/auth.service';
import { environment } from '../../../../Environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
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
  getAllStatistics(){
     return this.http.get<any>(`${environment.apiUrl}dashboard/statistics`,this.headerOption);
 
   }
}
