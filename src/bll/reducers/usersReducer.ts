import {ResultCode, usersAPI, UserType} from '../api';
import {Dispatch} from 'redux';
import {setError, setStatus} from './appReducer';
import {RootStateType} from '../store';

const initialUsersState = {
    items: [
        {
            id: 0,
            name: '',
            status: '',
            photos: {
                small: '',
                large: '',
            },
            followed: false
        }
    ],
    count: 20,
    page: 1,
}
export const usersReducer = (state = initialUsersState, action: ActionUsersType): InitialUsersStateType => {
    switch (action.type) {
        case 'USERS_REDUCER/SET_USERS':
            return {...state, items: action.data};
        default:
            return state;
    }
};
export const setUsers = (data: UserType[]) => ({type: 'USERS_REDUCER/SET_USERS', data} as const);
export const getUsers = () =>
    async (dispatch: Dispatch<ActionUsersType>, getState: () => RootStateType) => {
        try {
            const {count, page} = getState().users;
            dispatch(setStatus('loading'));
            const res = await usersAPI.getUsers({count, page});
            if (res.data.error){
                dispatch(setError(res.data.error));
            } else {
                dispatch(setUsers(res.data.items))

            }
        } catch (e: any) {
            dispatch(setError(e.message));
        } finally {
            dispatch(setStatus('idle'))
        }
    }
type InitialUsersStateType = typeof initialUsersState;
type ActionUsersType = ReturnType<typeof setUsers>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof setError>