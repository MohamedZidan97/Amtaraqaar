export interface IGetProperties {
    id:number,
    images:{path:string,id:number}[],
    title:string,
    number_of_views:number,
    ad_number:number,
    handover:Date,
    section:string,
    active:boolean
}
