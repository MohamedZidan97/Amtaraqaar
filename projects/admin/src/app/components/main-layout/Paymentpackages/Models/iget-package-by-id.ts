import { IPackageItem } from "./ipackage-item";

export interface IGetPackageById {
    en_title: string,
    ar_title: string,
    ar_description: string,
    type: string,
    price: number,
    package_items: IPackageItem[],
}
