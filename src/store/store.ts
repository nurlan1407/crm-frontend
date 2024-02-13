import { configureStore } from '@reduxjs/toolkit';
import tovarReducer from 'entities/Tovar/tovarSlice'
import userReducer from 'entities/user/userSlice';
import establishmentReducer from 'entities/Establishment/establishmentSlice';
import categoryReducer from 'entities/Tovar/categorySlice';
export const store = configureStore({
    reducer: {
        inventory: tovarReducer,
        user:userReducer,
        establishment:establishmentReducer,
        categories:categoryReducer
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;