import { mgtSliceType } from "@/Types/types"
import { createSlice } from "@reduxjs/toolkit"


const initialState: mgtSliceType = {
    isLoading: false,
    search: "",
    currentProject: {},
    projectList: [],
    duplicatedProjectList: [],
    passcodeList: [],
    duplicatedPasscodeList: [],
    singlePasscode: { isLocked: true, isUsed: true, key: "" }
}

const main = createSlice({
    name: "mgtSlice",
    initialState,
    reducers: {
        updateSearch(state: mgtSliceType, action) {
            state.search = action.payload
        },
        updateIsLoading(state: mgtSliceType, action) {
            state.isLoading = action.payload
        },
        fillAllProjects(state: mgtSliceType, action) {
            state.projectList = action.payload
            state.duplicatedProjectList = action.payload
        },
        fillProjectList(state: mgtSliceType, action) {
            state.projectList = action.payload
        },
        fillAllPasscodes(state: mgtSliceType, action) {
            state.passcodeList = action.payload
            state.duplicatedPasscodeList = action.payload
        },
        fillPasscodeList(state: mgtSliceType, action) {
            state.passcodeList = action.payload
        },
        fillSinglePasscode(state: mgtSliceType, action) {
            state.singlePasscode = action.payload
        },
        updateSinglePasscode(state: mgtSliceType, action) {
            const { name, value } = action.payload
            // @ts-ignore
            state.singlePasscode[name] = value
        }
    }
})


export const { actions: mgtSliceAction, reducer: mgtSlice } = main