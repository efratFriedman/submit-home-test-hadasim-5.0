import { createAsyncThunk, createSlice, isRejected } from "@reduxjs/toolkit";
import { Stock } from "../../models/Stock";
import { addStocks, getAllStocks } from "../../services/stock";

const initialState = {
    stocks: [] as Stock[],
    error: {}
}

export const fetchAllStocks = createAsyncThunk(
    'stock/fetchAllStocks',
    async () => {
        const response = await getAllStocks();
        return response;
    }
);

export const AddStocks = createAsyncThunk(
    'stock/AddStocks',
    async (stocks: Stock[]) => {
        const response = await addStocks(stocks);
        return response;
    }
);




export const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
   builder.addCase(fetchAllStocks.fulfilled,(state,action)=>{
    state.stocks=action.payload;
   });
   builder.addCase(AddStocks.fulfilled,(state,action)=>{
    state.stocks.push(...action.payload);
   })

        builder.addMatcher(
            isRejected,
            (state, action) => {
                state.error = action.error;
            }
        );
    }
})
export default stockSlice.reducer;

