import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../Environments/environment.prod';
import { AuthService } from '../../../auth/Services/auth.service';
import { map, Observable } from 'rxjs';
import { IPackageItem } from '../Models/ipackage-item';
import { IAddPackage } from '../Models/iadd-package';

@Injectable({
  providedIn: 'root'
})
export class PaymentPackagessService {
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


  //                          Packagessssssssssssssssss
  getAllPackages(){
    return this.http.get<any>(`${environment.apiUrl}packages`,this.headerOption);

  }
  addPackage(model:IAddPackage){
    return this.http.post<any>(`${environment.apiUrl}packages`,model,this.headerOption);

  }
  deletePackage(id:number){
    const url = `${environment.apiUrl}packages/${id}`;

    return this.http.delete(url,this.headerOption);
  }
  getPackageById(id:number){
    const url = `${environment.apiUrl}package/${id}/show`;
    return this.http.get<any>(url,this.headerOption);
  }

  updatePackage(id:number,model:any){
    const url = `${environment.apiUrl}packages/${id}`;

    return this.http.put<any>(url,model,this.headerOption);
  }


  //                          Package Itemsssssss

  // get all
  getPackageItems():Observable<IPackageItem[]>{
    return this.http.get<any>(`${environment.apiUrl}package-items`,this.headerOption)
    .pipe(
      map((res)=>
        res.map((item:any) => ({
          id: item.id,
          ar_title: item.ar_title,
        }))
      )
    );
  }

  // add 
  addPackageItem(model:any){
    return this.http.post<any>(`${environment.apiUrl}package-items`,model,this.headerOption)

  }

  // update
  updatePackageItem(id:number,model:any){
    const url = `${environment.apiUrl}package-items/${id}`;

    return this.http.put<any>(url,model,this.headerOption);
  }

  deletePackageItem(id:number){
    const url = `${environment.apiUrl}package-items/${id}`;

    return this.http.delete(url,this.headerOption);
  }
}
