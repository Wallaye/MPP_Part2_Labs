import * as authService from "../services/authService.js";
import {validationResult} from "express-validator";
import {ApiError} from "../exceptions/apiError.js";

export async function registration(req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return next(ApiError.BadRequest("Введены некорректные логин или пароль", errors.array()))
        }
        const {userName, password} = req.body;
        const userData = await authService.registration(userName, password);
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
        return res.json(userData);
    } catch (e) {
        next(e);
    }
}

export async function login(req, res, next) {
    try {
        const {userName, password} = req.body;
        const userData = await authService.login(userName, password)
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
        return res.json(userData);
    } catch (e) {
        next(e);
    }
}

export async function logout(req, res, next) {
    try {
        const {refreshToken} = req.cookies;
        const token = await authService.logout(refreshToken);
        res.clearCookie('refreshToken');
        return res.json(token);
    } catch (e) {
        next(e);
    }
}

export async function refresh(req, res, next){
    try {
        const {refreshToken} = req.cookies;
        const userData = await authService.refresh(refreshToken)
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
        return res.json(userData);
    } catch (e) {
        next(e);
    }
}