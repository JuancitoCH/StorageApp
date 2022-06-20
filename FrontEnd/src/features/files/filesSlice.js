import { createSlice } from "@reduxjs/toolkit";

const filesSlice = createSlice({
    name:'files',
    initialState:{
        filesChanged:true
    },
    reducers:{
        filesChangedFunction(state,action){
            state.filesChanged = !state.filesChanged
        }
    }
})

export default filesSlice.reducer
export const {filesChangedFunction} = filesSlice.actions