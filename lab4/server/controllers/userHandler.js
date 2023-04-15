import SocketErrors from "./errorHandler.js";
import * as authService from "../services/authService.js"

export const userHandler = (socket) => {
    async function login(userName, password) {
        try {
            const userData = await authService.login(userName, password);
            console.log(userData);
            socket.emit("users:login", userData)
        } catch (e) {
            SocketErrors.emitError(socket, e);
        }
    }

    async function registration(userName, password) {
        try {
            const userData = await authService.registration(userName, password);
            socket.emit("users:registration", userData)
        } catch (e) {
            SocketErrors.emitError(socket, e);
        }
    }

    async function logout(refreshToken) {
        try {
            const tokenData = await authService.logout(refreshToken)
            socket.emit("users:logout", tokenData)
        } catch (e) {
            SocketErrors.emitError(socket, e)
        }
    }

    async function refresh(refreshToken) {
        try {
            const tokenData = await authService.refresh(refreshToken);
            socket.emit("users:refresh", tokenData)
        } catch (e) {
            SocketErrors.emitError(socket, e)
        }
    }

    socket.on("users:login", login);
    socket.on("users:registration", registration);
    socket.on("users:logout", logout);
    socket.on("users:refresh", refresh);
}

