import axios from "axios"
import { Supplier } from "../models/Supplier"

export const supplierLogin=async(supplierLogin:Supplier)=>{
    try{
        const response=await axios.post(`http://localhost:8080/api/supplier/supplierLogin`,supplierLogin,
            { validateStatus: (status) => {
            return status < 500;
        },
    });
    return {supplier:response.data,httpStatus:response.status};
    }
    catch(error){
        throw error;
    }
};

export const supplierSignUp=async(supplierSignUp:Supplier)=>{
    try{
        const response=await axios.post(`http://localhost:8080/api/supplier/signUp`,supplierSignUp,
            { validateStatus: (status) => {
            return status < 500;
        },
    });
    return {supplier:response.data,httpStatus:response.status};
    }
    catch(error){
        throw error;
    }
};
