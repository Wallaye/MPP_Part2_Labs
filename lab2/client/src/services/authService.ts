import {AxiosResponse} from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
import api from "../http";
export default class AuthService{
    static async login(userName: string, password: string): Promise<AxiosResponse<AuthResponse>>{
        return await api.post<AuthResponse>('/auth/login', {userName, password});
    }

    static async registration(userName: string, password: string): Promise<AxiosResponse<AuthResponse>>{
        return await api.post<AuthResponse>('auth/registration', {userName, password});
    }

    static async logout(): Promise<void>{
        return await api.post('auth/logout');
    }
}