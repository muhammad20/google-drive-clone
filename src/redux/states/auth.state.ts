import { IUser } from "./user.interface";

export interface IUserAuthState {
    user: IUser | null,
    authenticated: boolean,
    loading: boolean,
    success: string,
    error: string,
}