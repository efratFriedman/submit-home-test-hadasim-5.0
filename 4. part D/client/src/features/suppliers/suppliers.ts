import { createAsyncThunk, createSlice, isRejected } from "@reduxjs/toolkit";
import { supplierLogin, supplierSignUp } from "../../services/supplier";
import { Supplier } from "../../models/Supplier";

const initialState={
    supplier:{} as Supplier,
    error:{},
};

export const loginSupplier=createAsyncThunk(
    'supplier/loginSupplier',
    async(supplier:Supplier)=>{
        const response=await supplierLogin(supplier);
        return response;
    }
);

export const signUpSupplier=createAsyncThunk(
'supplier/signUpSupplier',
async(supplier:Supplier)=>{
    const response=await supplierSignUp(supplier);
    return response;
}
);

export const supplierSlice=createSlice({
    name:'supplier',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(loginSupplier.fulfilled,(state,action)=>{
            state.supplier=action.payload?.supplier;
        });
        builder.addCase(signUpSupplier.fulfilled,(state,action)=>{
            state.supplier=action.payload?.supplier;
        });
        builder.addMatcher(
            isRejected,
            (state, action) => {
                state.error = action.error;
            }
        );
    }
})
export default supplierSlice.reducer;

