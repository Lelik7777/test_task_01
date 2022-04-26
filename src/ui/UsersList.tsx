import Grid from '@mui/material/Grid';
import {Box} from '@mui/material';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootStateType, useAppDispatch} from '../bll/store';
import {Navigate} from 'react-router-dom';
import {getUsers} from '../bll/reducers/usersReducer';
import {UserType} from '../bll/api';

export const UsersList = () => {
    const isAuth = useSelector<RootStateType, boolean>(state => state.login.isAuth);
    const dispatch = useAppDispatch();
    const users = useSelector<RootStateType, UserType[]>(state => state.users.items);
    useEffect(() => {
        dispatch(getUsers());
    }, [])
    if (!isAuth) return <Navigate to={'/login'}/>
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '85vh',
            marginTop: '5vh'
        }}><Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 5,
                padding: 5,
                border: '2px solid lightgrey',
                borderRadius: 3,
                width: 350,
                height: '90%',
                overflow: 'auto',
                backgroundColor: 'whitesmoke',
            }}
        >
            <Grid container justifyContent={'center'} alignItems={'center'} direction={'column'} sx={{margin: 'auto'}}>
                {users.map(x=><Grid item >{x.name}</Grid>)}
            </Grid>
        </Box>
        </div>
    )
}