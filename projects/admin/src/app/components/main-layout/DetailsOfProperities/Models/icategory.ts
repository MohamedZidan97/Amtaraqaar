export interface ICategory {
    id: number,
    ar_title:string,
    parent_id?:number,
    children:ICategory[]
}
