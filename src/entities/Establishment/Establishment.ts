import { ContactType } from "shared/consts/consts";
export interface Schedule{
    day:string;
    open:string;
    close:string;
}
export interface EstContact{
    type:ContactType;
    value:string;
}

export interface Establishment{
    id:number;
    ownerId:number;
    title:string;
    description:string;
    rating:string;
    longtitude:number;
    latitude:number;
    imgs:string[];
    mainImg:string;
    schedule:Schedule[];
    address:string;
    contacts:EstContact[];
    instagramLink:string;
    website:string;
}

export interface EditEstablishmentForm{
    id:number|null;
    title:string;
    description:string;
    address:string;
    contacts:EstContact[];
    mainImg:string|File|null;
}
export const defaultEstForm:EditEstablishmentForm={
    id:null,
    title:"",
    description:"",
    address:"",
    contacts:[],
    mainImg:null
}