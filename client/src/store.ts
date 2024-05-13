
import { configureStore } from "@reduxjs/toolkit"
import { briefSlice } from "./slices/briefSlice"
import { projectSlice } from "./slices/projectSlice"
import { mgtSlice } from "./slices/mgtSlice"

export const store = configureStore({
    reducer: {
        briefSlice,
        projectSlice,
        mgtSlice
    }
})