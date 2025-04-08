import { Status } from "./enums/Status";
import { Grocer } from "./Grocer";
import { Stock } from "./Stock";
import { Supplier } from "./Supplier";

export interface Order{
   id?:number,
   grocer:Grocer,
   supplier:Supplier,
   status:Status,
   quantity:number,
   stock:Stock
}