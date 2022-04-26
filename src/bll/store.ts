import {AnyAction, applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {usersReducer} from './reducers/usersReducer';
import {loginReducer} from './reducers/loginReducer';
import {appReducer} from './reducers/appReducer';
import {useDispatch} from 'react-redux';

const rootReducer = combineReducers({
    users: usersReducer,
    login: loginReducer,
    app: appReducer,
});
export const useAppDispatch = () => useDispatch<ThunkDispatch<RootStateType, void, AnyAction>>();
export const store = createStore(rootReducer, applyMiddleware(thunk));
export type RootStateType = ReturnType<typeof rootReducer>