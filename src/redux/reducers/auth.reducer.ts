import { AuthAction, SET_ERROR, SET_LOADING, SET_SUCCESS, SET_USER, SIGN_OUT } from "../actions/auth/auth.interface";
import { IUserAuthState } from "../states/auth.state";

const intitialState: IUserAuthState = {
    user: null,
    authenticated: false,
    loading: false,
    success: '',
    error: '',
}

export const authReducer = (prevState = intitialState, action: AuthAction) => {
    switch(action.type) {
        case SET_USER: return {
            ...prevState,
            user: action.payload,
            authenticated: true
        }
        case SET_LOADING: return {
            ...prevState,
            loading: action.payload,
        }
        case SIGN_OUT: return {
            ...prevState,
            authenticated: false,
            user: null,
            loading: false
        }
        case SET_ERROR: return {
            ...prevState,
            error: action.payload
        }
        case SET_SUCCESS: return {
            ...prevState,
            success: action.payload
        }
        default: return prevState
    }
}