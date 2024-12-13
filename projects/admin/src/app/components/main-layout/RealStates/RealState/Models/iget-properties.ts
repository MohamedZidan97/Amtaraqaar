export interface IGetProperties {
    id:number,
    media_files:{url:string,alt:string}[],
    title:string,
    number_of_views:number,
    ad_number:number,
    handover:Date,
    status:string
}
