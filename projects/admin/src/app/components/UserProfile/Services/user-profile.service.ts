import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../Environments/environment.prod';
import { AuthService } from '../../auth/Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  headerOption;
  constructor(private http: HttpClient, private auth: AuthService) {
    this.headerOption = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.auth.getToken()}`
      })
    };
  }

  // get
  getProfileData() {
    return this.http.get<any>(`${environment.apiUrl}user/profile`, this.headerOption);

  }

  // update 
  updateProfileData(model: any) {
    return this.http.put<any>(`${environment.apiUrl}user/profile`, model, this.headerOption);

  }

  // update password
  updatePassword(model: any) {
    return this.http.put<any>(`${environment.apiUrl}user/password`, model, this.headerOption);
  }


  // update avatar
  updateAvatar(model: any) {
    return this.http.post<any>(`${environment.apiUrl}user/avatar`, model, this.headerOption);

  }
}
