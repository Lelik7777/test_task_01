import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {usersReducer} from './reducers/usersReducer';
import {loginReducer} from './reducers/loginReducer';
import {appReducer} from './reducers/appReducer';

const rootReducer = combineReducers({
    users: usersReducer,
    login: loginReducer,
    app: appReducer,
});
export const store = createStore(rootReducer, applyMiddleware(thunk));
export type RootStateType = ReturnType<typeof rootReducer>