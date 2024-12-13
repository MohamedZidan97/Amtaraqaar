import { IPackageItem } from "./ipackage-item"

export interface IPackages {
  id:number,
  ar_title:string,
  en_title:string,
  type:string,
  ar_description:string,
  tenant_type:string,
  package_items:IPackageItem[],
  price:number
  created_at:Date,
  updated_at:Date
}
