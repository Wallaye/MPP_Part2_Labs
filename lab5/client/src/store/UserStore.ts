import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/authService";
import {AuthResponse} from "../models/response/AuthResponse";
import axios from "axios";
import {API_URL} from "../http";
import {useMutation} from "@apollo/client";
import {LOGIN, LOGOUT, REGISTRATION} from "../graphql/mutations/userMutations";


export const onError = (error: any) => {
    alert("Неверные данные")
}
export const onAuth = (userData: any) => {
    localStorage.setItem("accessToken", userData.accessToken)
    localStorage.setItem("refreshToken", userData.refreshToken)
}
export const onLogout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
}


export default class UserStore {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;


    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

}