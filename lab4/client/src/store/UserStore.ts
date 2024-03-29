import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/authService";
import {API_URL, socket} from "../http";
import {IErrorResponse} from "../models/response/IErrorResponse";
import {ILoginResponse} from "../models/response/ILoginResponse";

export default class UserStore {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;

    constructor() {
        socket.on("users:login", this.getLoginData)
        socket.on("users:registration", this.getLoginData)
        socket.on("users:logout", this.logOutListener)
        socket.on("users:refresh", this.getLoginData)
        socket.on("error", this.errorListener)
        makeAutoObservable(this)
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setLoading(loading: boolean) {
        this.isLoading = loading;
    }

    login(userName: string, password: string) {
        AuthService.login(userName, password);
    }

    private getLoginData = (userData: ILoginResponse) => {
        console.log(userData);
        localStorage.setItem('accessToken', userData.accessToken);
        localStorage.setItem('refreshToken', userData.refreshToken);
        this.setAuth(true);
        this.setUser(userData.user);
    }

    private logOutListener =  (userData: IUser) => {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        this.setAuth(false);
        this.setUser({} as IUser);
    }

    private errorListener = (error: IErrorResponse) => {
        console.log(error);
        if (error.status != 403) {
            this.setAuth(false);
            this.user = {} as IUser;
        }
    }

    registration(userName: string, password: string) {
        AuthService.registration(userName, password);
    }

    logout() {
        AuthService.logout(localStorage.getItem("refreshToken") as string);
    }

    checkIsAuth() {
        socket.emit("users:refresh", localStorage.getItem("refreshToken"));
    }
}

