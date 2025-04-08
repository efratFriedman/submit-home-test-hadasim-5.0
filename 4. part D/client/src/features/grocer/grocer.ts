import { createAsyncThunk, createSlice, isRejected } from "@reduxjs/toolkit";
import { grocerLogin } from "../../services/grocer";
import { Grocer } from "../../models/Grocer";

 export const initialState = {
    grocer: {} as Grocer,
    error: {},
    isGrocer: false,
};

export const loginGrocer = createAsyncThunk(
    'grocer/loginGrocer',
    async (grocer: Grocer) => {
        const response = await grocerLogin(grocer);
        return response;
    }
);




export const grocerSlice = createSlice({
    name: 'grocer',
    initialState,
    reducers: {
        setIsGrocer: (state) => {
            state.isGrocer =true;
        },
        signOut: (state) => {
            state.isGrocer = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginGrocer.fulfilled, (state, action) => {
            state.grocer = action.payload?.grocer;
        });

        builder.addMatcher(
            isRejected,
            (state, action) => {
                state.error = action.error;
            }
        );
    }
})
export const{setIsGrocer,signOut}=grocerSlice.actions;
export default grocerSlice.reducer;

