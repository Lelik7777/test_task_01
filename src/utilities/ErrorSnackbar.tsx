import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {RootStateType} from '../bll/store';
import {Snackbar} from '@material-ui/core';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {setError} from '../bll/reducers/appReducer';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export function ErrorSnackbar() {

    const error = useSelector<RootStateType, string | null>(state => state.app.error)

    const dispatch = useDispatch();

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setError(null))
    };

    return (
        <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    );
}
