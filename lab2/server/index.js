import express from 'express';
import mongoose from "mongoose";
import Activity from "./models/Activity.js";
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRouter from "./routes/authRouter.js";
import activitiesRouter from "./routes/activitiesRouter.js";
import {error as errorMiddleware} from "./middleware/error.js";
import cors from 'cors';


dotenv.config()
const PORT = process.env.PORT || 5000;
const URL = process.env.DB_URL;


const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use("/api/auth", authRouter);
app.use("/api", activitiesRouter);

app.use(errorMiddleware)

async function startApp(){
    try {
        await mongoose.connect(URL);
        app.listen(PORT, () => console.log("Server started at port " + PORT))
    } catch (e) {
        console.log(e);
    }
}

startApp();