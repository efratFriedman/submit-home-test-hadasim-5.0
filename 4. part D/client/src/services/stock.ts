import axios from "axios";
import { Stock } from "../models/Stock";

export const getAllStocks=async():Promise<Stock[]>=>{
    try{
        const stocks=await axios.get(`http://localhost:8080/api/stock/getAllStocks`);
        return stocks.data;
    }
    catch(error){
        throw error;
    }
};

export const addStocks=async(stocks:Stock[]):Promise<Stock[]>=>{
    try{
        const response=await axios.post(`http://localhost:8080/api/stock/addListStocks`,stocks);
        return response.data;
    }
    catch(error){
        throw error;
    }
};

