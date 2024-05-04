
import { configureStore } from "@reduxjs/toolkit"
import { briefSlice } from "./slices/briefSlice"

export const store = configureStore({
    reducer: {
        briefSlice,
    }
})