import express from 'express';
import mongoose from "mongoose";
import * as dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from "socket.io";
import {activityHandler} from "./controllers/activityHandler.js";
import {userHandler} from "./controllers/userHandler.js";
import {authMiddleware} from "./middleware/authMiddleware.js";

dotenv.config()
const URL = process.env.DB_URL;
const PORT = process.env.PORT | 5000;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: process.env.CLIENT_URL,
        credentials: true
    }
})

const onConnection = (socket) => {
    userHandler(socket);
    console.log("connected");
}

io.of("/private/").use(authMiddleware);
io.on("connection", onConnection);
io.of("/private/").on("connection", onPrivateConnection);

const start = async () => {
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        httpServer.listen(PORT, onListening)
    }catch (e){
        console.log(e)
    }
}

await start();

function onListening() {
    console.log('Listening on ' + PORT);
}

function onPrivateConnection(socket){
    console.log("private connected");
    userHandler(socket);
    activityHandler(socket);
}