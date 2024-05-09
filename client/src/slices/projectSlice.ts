import { projectSliceType } from "@/Types/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: projectSliceType = {
    search: "",
    projectList: null,
    duplicatedProjectList: null,
    isLoading: false,
    singleProject: { name: "", _id: "", type: "design" }
}
const main = createSlice({
    name: "projectSlice",
    initialState,
    reducers: {
        updateIsLoading(state: projectSliceType, action) {
            state.isLoading = action.payload
        },
        updateSearch(state: projectSliceType, action) {
            state.search = action.payload
        },
        updateSingleProject(state: projectSliceType, action) {
            state.singleProject = action.payload
        },
        updateAllProjects(state: projectSliceType, action) {
            state.duplicatedProjectList = action.payload
            state.projectList = action.payload
        },
        updateProjectList(state: projectSliceType, action) {
            state.projectList = action.payload
        }
    }
})

export const { actions: projectSliceActions, reducer: projectSlice } = main