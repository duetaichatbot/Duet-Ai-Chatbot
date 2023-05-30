import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./userSlice";



export const store = configureStore({
    reducer: authSlice,
});

