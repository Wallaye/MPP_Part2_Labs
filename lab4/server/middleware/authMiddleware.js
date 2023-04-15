import {ApiError} from "../exceptions/apiError.js";
import * as tokenService from "../services/tokenService.js"


export function authMiddleware(socket, next){
    try {
        const token = socket.handshake.auth.token
        if(!token){
            return next(ApiError.UnauthorizedError());
        }
        const userData = tokenService.validateAccessToken(token)
        if(!userData){
            return next(ApiError.UnauthorizedError());
        }
        next();
    }catch (e) {
        e.data = {status: e.status}
        next(e)
    }
}