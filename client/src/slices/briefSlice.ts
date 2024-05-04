import { briefSliceType } from "@/Types/types"
import { createSlice } from "@reduxjs/toolkit"


const initialState: briefSliceType = {
    allow: false,
    isLoading: false,
    passcode: { key: "", isLocked: false, isUsed: false },
    brief: {
        jobType: "design",
        brandName: "",
        brandServices: [],
        brandContact: 0,
        brandColors: [],
        brandValues: [],
        brandEmail: "",
        brandLocation: "",
        brandDescription: "",
        jobDescription: "",
        brandVisuals: [],
        // client
        clientContact: 0,
        clientName: "",
        clientEmail: "",
        clientLocation: "",
    }
}

const main = createSlice({
    name: "briefSlice",
    initialState,
    reducers: {
        updatePasscodeKey(state: briefSliceType, action: any) {
            state.passcode.key = action.payload
        },
        updatePasscode(state: briefSliceType, action) {
            state.passcode = action.payload
        },
        updateAllow(state: briefSliceType, action) {
            state.allow = action.payload
        }
        ,
        updateIsLoading(state: briefSliceType, action) {
            state.isLoading = action.payload
        }
        , updateBriefInput(state: briefSliceType, action) {
            const { name, value }: { name: string, value: any } = action.payload
            // @ts-ignore
            state.brief[name] = value
        },
        updateBrief(state: briefSliceType, action) {
            // const { brandValues, brandServices, brandColors, ...rest } = action.payload
            
            // state.brief = {...rest, brandColors:brandColors.join(",")}
            state.brief = action.payload
        },
        resetBrief(state: briefSliceType, action) {
            state.brief = {...initialState.brief, _id:action.payload}
        }
    }
})


export const { actions: briefSliceActions, reducer: briefSlice } = main