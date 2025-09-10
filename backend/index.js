import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";

const app = express();

const PORT = process.env.PORT || 4000;
app.use(cors({
  origin: "http://localhost:5173", // exact origin of your frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use("/api/auth/",authRouter);
app.use("/api/user/",userRouter);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});


