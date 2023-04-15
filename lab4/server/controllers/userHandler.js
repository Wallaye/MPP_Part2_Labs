import SocketErrors from "./errorHandler.js";
import * as authService from "../services/authService.js"

export const userHandler = (socket) => {
    async function login(userName, password) {
        try {
            const userData = await authService.login(userName, password);
            socket.emit("user:login", userData)
        } catch (e) {
            SocketErrors.emitError(socket, e);
        }
    }

    async function registration(socket, userName, password) {
        try {
            const userData = await authService.registration(userName, password);
            socket.emit("user:registration", userData)
        } catch (e) {
            SocketErrors.emitError(socket, e);
        }
    }

    async function logout(socket, refreshToken) {
        try {
            const tokenData = await authService.logout(refreshToken)
            socket.emit("users:logout", tokenData)
        } catch (e) {
            SocketErrors.emitError(socket, e)
        }
    }

    async function refresh(socket, refreshToken) {
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




