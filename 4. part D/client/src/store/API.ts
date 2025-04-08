import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { grocerSlice } from "../features/grocer/grocer";
import { supplierSlice } from "../features/suppliers/suppliers";
import { orderSlice } from "../features/orders/orders";
import { stockSlice } from "../features/stocks/stocks";

const rootReducer = combineReducers({
    grocer: grocerSlice.reducer,
    supplier: supplierSlice.reducer,
    order: orderSlice.reducer,
    stock: stockSlice.reducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['grocer', 'supplier'],
    stateReconciler: (
        inboundState: ReturnType<typeof rootReducer> | undefined,
        originalState: ReturnType<typeof rootReducer>
    ) => {
        if (inboundState?.grocer) {
            return {
                ...inboundState,
                grocer: { ...inboundState.grocer, isGrocer: false }
            };
        }
        return inboundState || originalState;
    }
};



const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch