import axios from "axios"
import { Grocer } from "../models/Grocer"

interface GrocerResponse{
    grocer:Grocer;
    httpStatus:number;
}
export const grocerLogin=async(grocerLogin:Grocer):Promise<GrocerResponse>=>{
    try{
        const response=await axios.post(`http://localhost:8080/api/grocer/grocerLogin`,grocerLogin,
            { validateStatus: (status) => {
            return status < 500;
        },
    });
        return {grocer:response.data,httpStatus:response.status};
    }
    catch(error){
        throw error;
    }
};