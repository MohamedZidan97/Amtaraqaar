import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../../auth/Services/auth.service';
import { environment } from '../../../../Environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DetailsOfPropertyService {
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

  //                          Category
  getAllCategories(){
    return this.http.get<any>(`${environment.apiUrl}categories/subcategories`,this.headerOption);
  }

  addCategory(model: any) {
    return this.http.post<any>(`${environment.apiUrl}categories`, model, this.headerOption);
  }

  deleteCategory(id:number) {
    return this.http.delete(`${environment.apiUrl}categories/${id}`,this.headerOption);  
  }

  updateCategory(id:number,model:any){
    return this.http.put<any>(`${environment.apiUrl}categories/${id}`, model, this.headerOption);
  }

  //                           Feature
  getAllFeatures(){
    return this.http.get<any>(`${environment.apiUrl}features`,this.headerOption);
  }

  addFeature(model: any) {
    return this.http.post<any>(`${environment.apiUrl}features`, model, this.headerOption);
  }

  deleteFeature(id:number) {
    return this.http.delete(`${environment.apiUrl}features/${id}`,this.headerOption);  
  }

  updateFeature(id:number,model:any){
    return this.http.put<any>(`${environment.apiUrl}features/${id}`, model, this.headerOption);
  }

}
