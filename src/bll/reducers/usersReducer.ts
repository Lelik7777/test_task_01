import {UserType} from '../api';

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
    ]
}
export const usersReducer = (state = initialUsersState, action: ActionUsersType):InitialUsersStateType => {
    switch (action.type) {
        case 'USERS_REDUCER/SET_USERS':
            return {...state, items: action.data};
        default:
            return state;
    }
};
export const setUsers = (data: UserType[]) => ({type: 'USERS_REDUCER/SET_USERS', data} as const);

type InitialUsersStateType=typeof initialUsersState;
type ActionUsersType = ReturnType<typeof setUsers>;