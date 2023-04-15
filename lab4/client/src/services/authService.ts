import {socket} from "../http";
export default class AuthService{
    static login(userName: string, password: string){
        socket.emit("users:login", userName, password);
    }

    static registration(userName: string, password: string){
        socket.emit("users:registration", userName, password);
    }
    static logout(refreshToken: string){
        localStorage.removeItem('accessToken');
        socket.emit("users:logout", refreshToken);
    }
}