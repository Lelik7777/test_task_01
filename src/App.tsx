import React from 'react';
import './App.css';
import {AppBar, Container, IconButton, LinearProgress, Typography} from '@material-ui/core';
import {Navigate, Route, Routes} from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import {Login} from './ui/login/Login';
import {UsersList} from './ui/UsersList';
import {ErrorSnackbar} from './utilities/ErrorSnackbar';
import {Menu} from '@material-ui/icons';
import {useSelector} from 'react-redux';
import {RootStateType} from './bll/store';
import {RequestStatusType} from './bll/reducers/appReducer';

function App() {
    const status = useSelector<RootStateType, RequestStatusType>(state => state.app.status)
    return (
        <div>
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        test login plus users list
                    </Typography>
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
