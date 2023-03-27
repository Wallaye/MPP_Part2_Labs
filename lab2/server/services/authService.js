import User from "../models/User.js";
import * as bcrypt from 'bcrypt';
import * as tokenService from './tokenService.js';
import {UserDto} from "../dtos/userDto.js";
import {ApiError} from "../exceptions/apiError.js";

export async function registration(userName, password){
    const candidate = await User.findOne({userName})
    if (candidate){
        throw ApiError.BadRequest(`Пользователь с таким ником ${userName} уже существует`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const user = await User.create({userName, password: hashPassword});
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({...userDto});
    await tokenService.saveToken(userDto.userId, tokens.refreshToken);

    return {...tokens, user: userDto};
}

export async function login(userName, password){
    const user = await User.findOne({userName});
    if (!user){
        throw ApiError.BadRequest('Пользователь с таким ником не зарегестрирован');
    }
    const isEqualPass = await bcrypt.compare(password, user.password);
    if (!isEqualPass){
        throw ApiError.BadRequest('Неверный пароль');
    }
    console.log(userName + " " + password)
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({...userDto});
    await tokenService.saveToken(userDto.userId, tokens.refreshToken);

    return {...tokens, user: userDto};
}

export async function logout(refreshToken){
    return await tokenService.removeToken(refreshToken);
}

export async function refresh(refreshToken){
    if (!refreshToken){
        throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenDb){
        throw ApiError.UnauthorizedError();
    }
    const user = await User.findById(userData.userId);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({...userDto});
    await tokenService.saveToken(userDto.userId, tokens.refreshToken);

    return {...tokens, user: userDto};
}