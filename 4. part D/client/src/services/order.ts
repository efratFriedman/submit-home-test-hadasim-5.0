import axios from "axios";
import { Order } from "../models/Order";
import { Status } from "../models/enums/Status";

export const getOrdersBySupplierId=async(supplierId:number):Promise<Order[]>=>{
    try{
        const response=await axios.get(`http://localhost:8080/api/order/getOrdersBySupplier/${supplierId}`);
        return response.data;
    }
    catch(error){
        throw error;
    }
};

export const updateStatusOrder = async (orderId: number, status: Status) => {
    try {
        const response = await axios.put(
            `http://localhost:8080/api/order/updateOrderStatus/${orderId}`,
            JSON.stringify(status),  
            {
                headers: {
                    'Content-Type': 'application/json',  
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};



export const orderStock=async(order:Order)=>{
    try{
        const response=await axios.post(`http://localhost:8080/api/order/orderingStock`,order);
        console.log(response);
        
        return response.data;
    }
    catch(error){
        throw error;
    }
};

export const  getOrdersNotCompleted=async():Promise<Order[]>=>{
    try{
        const response=await axios.get(`http://localhost:8080/api/order/getOrdersNotCompleted`);
        return response.data;
    }
    catch(error){
        throw error;
    }
};


export const  getAllOrders=async():Promise<Order[]>=>{
    try{
        const response=await axios.get(`http://localhost:8080/api/order/getAllOrders`);
        return response.data;
    }
    catch(error){
        throw error;
    }
};





