import {IUser} from "../IUser";

export interface ILoginResponse {
    user: IUser;
    refreshToken: string;
    accessToken: string;
}

