import React, {useEffect} from 'react';
import './App.css';
import {AppBar, Container, IconButton, LinearProgress, Typography} from '@material-ui/core';
import {Navigate, NavLink, Route, Routes} from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import {Login} from './ui/login/Login';
import {UsersList} from './ui/UsersList';
import {ErrorSnackbar} from './utilities/ErrorSnackbar';
import {Menu} from '@material-ui/icons';
import {useSelector} from 'react-redux';
import {RootStateType, useAppDispatch} from './bll/store';
import {RequestStatusType} from './bll/reducers/appReducer';
import {getAuthMe, logout} from './bll/reducers/loginReducer';
import Button from '@mui/material/Button';

function App() {
    const status = useSelector<RootStateType, RequestStatusType>(state => state.app.status);
    const dispatch = useAppDispatch();
    const isAuth = useSelector<RootStateType, boolean>(state => state.login.isAuth);
    useEffect(() => {
        dispatch(getAuthMe());
    }, []);
    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <div>
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        test login plus users list
                    </Typography>
                    {isAuth
                    ?<Button color="inherit" onClick={handleLogout}>Logout</Button>
                    :<Button color="inherit" >
                            <NavLink to={'/login'} style={{color:'white',textDecoration:'none'}}>Login</NavLink>
                    </Button>
                    }
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<UsersList/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                    <Route path={'/404'} element={<h1>Error 404</h1>}/>
                </Routes>
            </Container>
        </div>
    )
}


export default App;
