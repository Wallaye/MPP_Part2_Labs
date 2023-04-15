import {io} from "socket.io-client";

export const API_URL = 'http://localhost:5000/'

export const socket = io(API_URL)

export const socketPrivate = io(API_URL + "private/", {
    auth: {
        token: localStorage.getItem("accessToken")
    }
})

socketPrivate.on("connect_error", (err) => {
    socket.emit("users:refresh", localStorage.getItem("refreshToken"))
})