import { Supplier } from "./Supplier";

export interface Stock{
   id?:number,
   name:string,
   price:number,
   minimumPurchase:number,
   supplier:Supplier
}