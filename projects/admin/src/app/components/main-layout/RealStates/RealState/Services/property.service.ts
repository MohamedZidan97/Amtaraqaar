import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../../../auth/Services/auth.service';
import { environment } from '../../../../../Environments/environment.prod';
import { map, Observable } from 'rxjs';
import { IGetProperties } from '../Models/iget-properties';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
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

   getAllProperties(){
    return this.http.get<any>(`${environment.apiUrl}properties`,this.headerOption);

  }

  // addPackage(model:IAddPackage){
  //   return this.http.post<any>(`${environment.apiUrl}packages`,model,this.headerOption);

  // }
  deleteProperty(id:number){
    const url = `${environment.apiUrl}properties/${id}`;

    return this.http.delete(url,this.headerOption);
  }
  
  getPropertyById(id:number){
    const url = `${environment.apiUrl}properties/${id}`;
    return this.http.get<any>(url,this.headerOption);
  }

  updateProperty(id:number,model:any){
    const url = `${environment.apiUrl}properties/${id}`;
    console.log('update..',model);
    return this.http.post<any>(url,model,this.headerOption);
  }

}
