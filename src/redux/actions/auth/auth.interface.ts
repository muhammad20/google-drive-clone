import { IUser } from "../../states/user.interface";

export const SET_USER = 'SET_USER';
export const SIGN_OUT = 'SIGN_OUT';
export const SET_LOADING = 'SET_LOADING';
export const SET_SUCCESS = 'SUCCESS';
export const SET_ERROR = 'SET_ERROR';

interface ISetUserAction {
    type: typeof SET_USER,
    payload: IUser
}

interface ISignOutUserAction {
    type: typeof SIGN_OUT
}

interface ISetLoadingAction {
    type: typeof SET_LOADING,
    payload: boolean
}

interface ISetSuccessAction {
    type: typeof SET_SUCCESS,
    payload: string
}

interface ISetErrorAction {
    type: typeof SET_ERROR,
    payload: string
}

export type AuthAction = ISetUserAction | ISetSuccessAction | ISetLoadingAction | ISignOutUserAction | ISignOutUserAction | ISetErrorAction;