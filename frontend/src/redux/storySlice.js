import { createSlice } from "@reduxjs/toolkit";

const storySlice = createSlice({
    name: "post",
    initialState: {
        storyData: [],
    },
    reducers: {
        setStoryData :(state,action)=>{
            state.storyData=action.payload;
        }
    }
})

export const {setStoryData}=storySlice.actions;
export default storySlice.reducer;


