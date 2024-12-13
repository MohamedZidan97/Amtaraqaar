import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IGetTokenResponse } from '../Models/iget-token-response';
import { LoginRequest } from '../Models/login-request';
import { Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt'
import { environment } from '../../../Environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headerOption;
 // baseUrl: string = 'http://localhost:7252/api/Account/';
  private userPayload:any;

  constructor(private router:Router,private http:HttpClient) {
    this.headerOption = {
      headers: new HttpHeaders({
        'accept': "'/*",
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${this.getToken()}`
      })
    };
    //this.userPayload=this.decodedToken();
  }
  //return this.httpClient.get<IProdect>(`${environment.apiUrl}Product/${proId}`,this.headerOption);
  login(model: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}login`, model);
  }

  logOut() {
    localStorage.clear();
    //localStorage.removeItem('token');
    this.router.navigate(['Login']);
  }

  // Token
  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue)
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }


  // email
  storeEmail(emailValue: string) {
    localStorage.setItem('email',emailValue )
  }
  getEmail(): string | null {
    return localStorage.getItem('email');
  }

  // phone
  storePhone(PhoneValue: string) {
    localStorage.setItem('Phone',PhoneValue )
  }
  getPhone(): string | null {
    return localStorage.getItem('Phone');
  }

  // name
  storeName(nameValue: string) {
    localStorage.setItem('Name',nameValue )
  }
  getName(): string | null {
    return localStorage.getItem('Name');
  }

  




  // Decode token

  // decodedToken(){
  //   const jwtHelper = new JwtHelperService();
  //   const token = this.getToken()!;
  //   console.log(jwtHelper.decodeToken(token))
  //   return jwtHelper.decodeToken(token)
  // }

  // getfullNameFromToken(){
  //   if(this.userPayload)
  //   return this.userPayload.email;
  // }

  // getRoleFromToken(){
  //   if(this.userPayload)
  //   return this.userPayload.aud;
  // }
}
