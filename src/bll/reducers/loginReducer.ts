import {loginAPI, RequestLoginType, ResultCode} from '../api';
import {Dispatch} from 'react';
import {setError, setStatus} from './appReducer';

const initialLoginState = {

    isAuth: false,
}
export const loginReducer = (state = initialLoginState, action: ActionLoginType): InitialLoginStateType => {
    switch (action.type) {
        default:
            return state;
    }
};

export const setLogin = (isAuth: boolean) => ({type: 'LOGIN_REDUCER/SET_LOGIN', isAuth} as const);

export const setLoginT = (data: RequestLoginType) =>
    async (dispatch: Dispatch<ActionLoginType>) => {
        dispatch(setStatus('loading'));
        try {
            const res = await loginAPI.login(data);
            if (res.data.resultCode === ResultCode.successful) {
                dispatch(setLogin(true));
            } else {
                dispatch(setError(res.data.messages[0]))
            }
        } catch (e: any) {
            dispatch(setError(e.message))
        } finally {
            dispatch(setStatus('idle'));
        }

    }
type ActionLoginType = ReturnType<typeof setLogin>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof setError>
type InitialLoginStateType = typeof initialLoginState;