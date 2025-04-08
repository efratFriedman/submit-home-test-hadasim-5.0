import { createAsyncThunk, createSlice, isRejected } from "@reduxjs/toolkit";
import { Order } from "../../models/Order";
import { getAllOrders, getOrdersBySupplierId, getOrdersNotCompleted, orderStock, updateStatusOrder } from "../../services/order";
import { Status } from "../../models/enums/Status";

const initialState = {
    orders: [] as Order[],
    ordersBySupplier: [] as Order[],
    ordersNotCompleted: [] as Order[],
    error: {}
}
 
export const fetchOrdersBySupplier=createAsyncThunk(
    'order/fetchOrdersBySupplier',
    async(supplierId:number)=>{
        const response=await getOrdersBySupplierId(supplierId);
        return response;
    }
);

export const UpdateStatusOrder=createAsyncThunk(
    'order/updateStatusOrder',
    async({orderId,status}:{orderId:number,status:Status})=>{
        const response=await updateStatusOrder(orderId,status);
        return response;
    }
);

export const OrderNewStock=createAsyncThunk(
    'order/OrderNewStock',
   async(order:Order)=>{
    const response=await orderStock(order);
    return response;
   }
);

export const fetchOrdersNotCompleted=createAsyncThunk(
    'order/fetchOrdersNotCompleted',
    async()=>{
        const response=await getOrdersNotCompleted();
        return response;
    }
);

export const fetchAllOrders=createAsyncThunk(
    'order/fetchAllOrders',
    async()=>{
        const response=await getAllOrders();
        return response;
    }
);



export const orderSlice=createSlice({
    name:'order',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchOrdersBySupplier.fulfilled,(state,action)=>{
            state.ordersBySupplier=action.payload;
        });
        builder.addCase(fetchAllOrders.fulfilled,(state,action)=>{
            state.orders=action.payload;
        });
        builder.addCase(fetchOrdersNotCompleted.fulfilled,(state,action)=>{
            state.ordersNotCompleted=action.payload;
        });
        builder.addCase(OrderNewStock.fulfilled,(state,action)=>{
            state.orders.push(action.payload);
            state.ordersNotCompleted.push(action.payload);
        });
        builder.addCase(UpdateStatusOrder.fulfilled,(state,action)=>{
            state.orders=state.orders.map(order=>order.id===action.payload.id?action.payload:order);
            state.ordersBySupplier=state.ordersBySupplier.map(order=>order.id===action.payload.id?action.payload:order);
             if(action.payload.status===Status.COMPLETED){
                state.ordersNotCompleted=state.ordersNotCompleted.filter(order => order.id !== action.payload.id);
            }
        });
        builder.addMatcher(
            isRejected,
            (state, action) => {
                state.error = action.error;
            }
        );
    }
})
export default orderSlice.reducer;

