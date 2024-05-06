
import { configureStore } from "@reduxjs/toolkit"
import { briefSlice } from "./slices/briefSlice"
import { projectSlice } from "./slices/projectSlice"

export const store = configureStore({
    reducer: {
        briefSlice,
        projectSlice
    }
})