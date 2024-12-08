import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

// Konfigurasi Redux store
export const store = configureStore({
  reducer: rootReducer,
});

// Tipe untuk state dan dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
