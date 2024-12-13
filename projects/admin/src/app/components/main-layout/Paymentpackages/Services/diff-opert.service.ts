import { Injectable } from '@angular/core';
import { IPackageItem } from '../Models/ipackage-item';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiffOpertService {
private getPackageItemsBehavSub:BehaviorSubject<IPackageItem[]> ;
  constructor() {
    this.getPackageItemsBehavSub = new BehaviorSubject<IPackageItem[]>([]);
   }


   getItems(items:IPackageItem[]){
      this.getPackageItemsBehavSub.next(items);
   }

   getloggedStatus(): Observable<IPackageItem[]>
  {
    return this.getPackageItemsBehavSub.asObservable();
  }
}
