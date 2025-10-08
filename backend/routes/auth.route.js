import express from "express";
import { signIn, signUp, signout,sendOtp,verifyOtp,resetPassword } from "../controllers/auth.controller.js";

const authRouter= express.Router();

authRouter.post("/signin",signIn);
authRouter.post("/signup",signUp);
authRouter.post("/sentOtp",sendOtp);
authRouter.post("/verifyOtp",verifyOtp);
authRouter.post("/resetPassword",resetPassword);
authRouter.get("/signout",signout);

export default authRouter;

