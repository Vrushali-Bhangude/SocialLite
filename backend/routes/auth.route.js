import express from "express";
import { signIn, signUp, signout } from "../controllers/auth.controller.js";

const authRouter= express.Router();

authRouter.post("/signin",signIn);
authRouter.post("/signup",signUp);
authRouter.get("/signout",signout);

export default authRouter;

