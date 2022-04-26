import axios, {AxiosResponse} from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'API-KEY': '418ccc24-66fd-40f8-b071-9bde653329c9',
    }
});

export const usersAPI = {
    getUsers: (data: RequestUsersType) =>
        instance.get<RequestUsersType, AxiosResponse<ResponseUsersType>>('/users', {
            params: data,
        }),
};
export const loginAPI = {
    login: (data: RequestLoginType) =>
        instance.post<RequestLoginType, AxiosResponse<ResponseLoginType<{ userId: number }>>>('/auth/login', data),
    getAuth: () =>
        instance.get<ResponseLoginType<{ id: number, email: string, login: string }>>('/auth/me'),
    logout: () =>
        instance.delete<ResponseLoginType>('/auth/login'),
};

export type RequestLoginType = {
    email: string;
    password: string;
    rememberMe?: boolean;
    captcha?: boolean;
}
export type ResponseLoginType<T = {}> = {
    resultCode: number;
    messages: string[];
    data: T;
}
export type RequestUsersType = {
    count: number;
    page: number;
    term?: string;
    friends?: boolean;
}
export type ResponseUsersType = {
    items: UserType[],
    totalCount: number;
    error: string;
}
export type UserType = {
    id: number;
    name: string;
    status: string;
    photos: {
        small: string;
        large: string;
    };
    followed: boolean;
}

export enum ResultCode {
    successful = 0,
    unsuccessful = 1,
}