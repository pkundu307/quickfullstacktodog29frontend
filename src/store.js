import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./features/chatSlice"
export const store = configureStore({
    reducer: {
        // feature1,feature2
        chat:chatReducer
    },
})