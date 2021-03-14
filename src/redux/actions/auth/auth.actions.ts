import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../store';
import { AuthAction, SET_ERROR, SET_LOADING, SET_SUCCESS, SET_USER, SIGN_OUT } from './auth.interface';
import firebase from '../../../firebase/app-config';
import { IUser } from '../../states/user.interface';

export const setUser = (user: firebase.User): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
        try {
            const userData: IUser = {
                email: user.email,
                firstName: user.displayName,
                id: user.uid
            }
            dispatch({
                type: SET_USER,
                payload: userData
            })
        } catch (e) {
            console.log(e);
        }
    }
}

export const setLoading = (value: boolean): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
        try {
            dispatch({
                type: SET_LOADING,
                payload: value
            })
        } catch (e) {
            console.log(e);
        }
    }
}

export const logOut = (): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
        try {
            dispatch(setLoading(true));
            await firebase.auth().signOut();
            dispatch({
                type: SIGN_OUT
            })
        } catch (e) {
            console.log(e);
            dispatch(setLoading(false));
        }
    }
}

export const setSuccess = (msg: string): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
        try {
            dispatch({
                type: SET_SUCCESS,
                payload: msg
            })
        } catch (e) {

        }
    }
}

export const setError = (msg: string): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
        try {
            dispatch({
                type: SET_ERROR,
                payload: msg
            })
        } catch (e) {
            console.log(e);
        }
    }
}