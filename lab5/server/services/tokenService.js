import jwt from 'jsonwebtoken';
import Token from "../models/Token.js";

export function generateTokens(payload){
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {expiresIn: '30m'})
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {expiresIn: '30d'})
    return{
        accessToken,
        refreshToken
    }
}

export async function saveToken(userId, refreshToken){
    const tokenData = await Token.findOne({user: userId});
    if (tokenData){
        tokenData.refreshToken = refreshToken;
        return tokenData.save();
    }
    return await Token.create({user: userId, refreshToken});
}

export async function removeToken(refreshToken){
    return Token.findOneAndRemove({refreshToken});
}

export async function findToken(refreshToken){
    return Token.findOne({refreshToken});
}

export function validateAccessToken(token){
    try{
        const response = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
        return response;
    } catch (e){
        return null;
    }
}
export function validateRefreshToken(token){
    try{
        const userData = jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
        return userData;
    } catch (e){
        console.log(e);
        return null;
    }
}