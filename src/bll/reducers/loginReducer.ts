import {loginAPI, RequestLoginType, ResultCode} from '../api';
import {Dispatch} from 'redux';
import {setError, setStatus} from './appReducer';

const initialLoginState = {
    isAuth: false,
}
export const loginReducer = (state = initialLoginState, action: ActionLoginType): InitialLoginStateType => {
    switch (action.type) {
        case 'LOGIN_REDUCER/SET_LOGIN':
            return {...state, isAuth: action.isAuth};
        default:
            return state;
    }
};

export const setLogin = (isAuth: boolean) => ({type: 'LOGIN_REDUCER/SET_LOGIN', isAuth} as const);

export const setLoginT = (data: RequestLoginType) =>
    async (dispatch: Dispatch<ActionLoginType>) => {

        try {
            dispatch(setStatus('loading'));
            const res = await loginAPI.login(data);
            if (res.data.resultCode === ResultCode.successful) {
                dispatch(setLogin(true));
            } else {
                dispatch(setError(res.data.messages[0]));
            }
        } catch (e: any) {
            dispatch(setError(e.message));
        } finally {
            dispatch(setStatus('idle'));
        }

    }
export const getAuthMe = () =>
    async (dispatch: Dispatch<ActionLoginType>) => {
        try {
            dispatch(setStatus('loading'));
            const res = await loginAPI.getAuth();
            if (res.data.resultCode === ResultCode.successful) {
                dispatch(setLogin(true));
            } else {
                dispatch(setError(res.data.messages[0]));
            }
        } catch (e: any) {
            dispatch(setError(e.message));
        } finally {
            dispatch(setStatus('idle'));
        }
    };
export const logout = () =>
 async (dispatch: Dispatch<ActionLoginType>) => {
    try {
        dispatch(setStatus('loading'));
        const res = await loginAPI.logout();
        if (res.data.resultCode === ResultCode.successful) {
            dispatch(setLogin(false));
        } else {
            dispatch(setError(res.data.messages[0]));
        }
    } catch (e: any) {
        dispatch(setError(e.message));
    } finally {
        dispatch(setStatus('idle'));
    }
};
export type ActionLoginType =
    ReturnType<typeof setLogin>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof setError>
type InitialLoginStateType = typeof initialLoginState;