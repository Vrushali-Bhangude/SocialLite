import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import postSlice from "./postSlice.js";
import storySlice from "./storySlice.js";
import loopSlice from "./loopSlice.js";
 const store = configureStore({
    reducer: {
        user: userReducer,
        post : postSlice,
        story: storySlice,
        loop : loopSlice
    }
})

export {store};