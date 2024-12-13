import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient) { }

  // getDep():Observable<any>{
  //   return this.http.get<any>('http://localhost:5093/api/Department/getAllDepartments');
  // }
  // getAllProducts(): Observable<any[]> {
  //   return this.http.get<any[]>('http://localhost:5093/api/Department/getAllDepartments');
  // }
}
