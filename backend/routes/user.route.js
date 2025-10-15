import express from "express";
import {editProfile, getCurrentUser,getProfile,suggestedUsers } from "../controllers/user.controller.js";
import isAuth from "../middleware/isAuth.js";
import { upload } from "../middleware/multer.js";
const userRouter = express.Router();

userRouter.get("/current", isAuth, getCurrentUser);
userRouter.get("/suggested", isAuth,suggestedUsers );
userRouter.get("/getProfile/:userName",isAuth,getProfile);
userRouter.post("/editProfile", isAuth,upload.single("profileImage"), editProfile);

export default userRouter;

