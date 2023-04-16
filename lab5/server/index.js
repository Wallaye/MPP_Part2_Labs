import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import {graphqlHTTP} from "express-graphql";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import {privateSchema, userSchema} from "./graphql/schemas/index.js";
import {error as errorMiddleware} from "./middleware/error.js";


dotenv.config();
const PORT = process.env.PORT || 5000;
const URL = process.env.DB_URL;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))

app.use('/graphql/auth', graphqlHTTP({
    graphiql: true,
    schema: userSchema

}))

app.use('/graphql/activities', graphqlHTTP({
    graphiql: true,
    schema: privateSchema
}))

app.use(errorMiddleware)
async function startApp(){
    try {
        await mongoose.connect(URL);
        app.listen(PORT, () => console.log("Server started at port " + PORT))
    } catch (e) {
        console.log(e);
    }
}

startApp()
