import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/authService";
import {AuthResponse} from "../models/response/AuthResponse";
import axios from "axios";
import {API_URL} from "../http";
import {useMutation} from "@apollo/client";
import {LOGIN, LOGOUT, REFRESH, REGISTRATION} from "../graphql/mutations/userMutations";
import {userClient} from "../graphql";


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
        if (this.isAuth != bool) {
            this.isAuth = bool;
        }
    }

    setLoading(bool: boolean) {
        if (this.isLoading != bool) {
            this.isLoading = bool;
        }
    }

    setUser(user: IUser) {
        if (this.user != user) {
            this.user = user;
        }
    }

    async login(userName: string, password: string) {
        const {data} = await userClient.mutate({
            mutation: LOGIN,
            variables: {
                input: {
                    userName: userName,
                    password: password
                }
            }
        })
        if (!data.errors) {
            onAuth(data.login)
            this.setAuth(true);
            this.setUser(data.login.user as IUser)
        } else {
            throw new Error("Login error")
        }
    }

    async logout(refreshToken: string) {
        const {data} = await userClient.mutate({
            mutation: LOGOUT,
            variables: {
                token: refreshToken
            }
        })
        if (!data.errors) {
            onLogout()
            this.setAuth(false);
            this.setUser({} as IUser)
        } else {
            throw new Error("Logout error")
        }
    }

    async registration(userName: string, password: string) {
        const {data} = await userClient.mutate({
            mutation: REGISTRATION,
            variables: {
                input: {
                    userName: userName,
                    password: password
                }
            }
        })
        if (!data.errors) {
            onAuth(data.registration)
            this.setAuth(true);
            this.setUser(data.registration.user as IUser)
        } else {
            console.log(data.errors)
        }
    }

    async checkIsAuth() {
        try {
            const {data} = await userClient.mutate({
                mutation: REFRESH,
                variables: {
                    token: localStorage.getItem("refreshToken")
                }
            })
            if (!data.errors) {
                onAuth(data.refresh)
                this.setAuth(true);
                this.setUser(data.refresh.user as IUser)
            }
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}