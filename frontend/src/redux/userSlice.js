import { createSlice } from "@reduxjs/toolkit";
import { suggestedUsers } from "../../../backend/controllers/user.controller";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
        suggestedUsers:null,
    },
    reducers: {
        setUserData :(state,action)=>{
            state.userData=action.payload;
        },
        setSuggestedUsers:(state,action)=>{
            state.suggestedUsers=action.payload;
        }

    }
})

export const {setUserData,setSuggestedUsers}=userSlice.actions;
export default userSlice.reducer;


