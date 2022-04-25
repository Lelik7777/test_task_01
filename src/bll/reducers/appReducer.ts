const initialAppState: InitialAppType = {
    status: 'idle',
    error: null,
};
export const appReducer = (state = initialAppState, action: ActionAppType): InitialAppType => {
    switch (action.type) {
        case 'APP_REDUCER/SET_ERROR':
            return {...state, error: action.er};
        case 'APP_REDUCER/SET_STATUS':
            return {...state, status: action.status};
        default:
            return state;
    }
};
export const setError = (er: string | null) =>
    ({type: 'APP_REDUCER/SET_ERROR', er} as const);
export const setStatus = (status: RequestStatusType) =>
    ({type: 'APP_REDUCER/SET_STATUS', status} as const);

export type RequestStatusType = 'idle' | 'loading';
type InitialAppType = {
    status: RequestStatusType;
    error: null | string;
}
type ActionAppType = ReturnType<typeof setError>
    | ReturnType<typeof setStatus>