import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDbStoreService {
  private fullName$ = new BehaviorSubject<string>("");
  private email$ = new BehaviorSubject<string>("");
  
  constructor() { }
  
    public getEmailFromStore(){
      return this.email$.asObservable();
    }
  
    public setEmailForStore(email:string){
      this.email$.next(email);
    }
  
    public getFullNameFromStore(){
      return this.fullName$.asObservable();
    }
  
    public setFullNameForStore(fullname:string){
      this.fullName$.next(fullname)
    }
}
