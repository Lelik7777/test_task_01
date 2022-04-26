import React, {useState} from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import * as Yup from 'yup';
import {Box, IconButton, Input, InputAdornment, InputLabel} from '@mui/material';
import Typography from '@mui/material/Typography';
import {colorBlueMI, fontSizeButtonAuth, redStyle} from '../../utilities/for styles';
import {Visibility, VisibilityOff} from '@material-ui/icons';
import {useFormik} from 'formik';
import {RootStateType, useAppDispatch} from '../../bll/store';
import s from './Login.module.css';
import {setLoginT} from '../../bll/reducers/loginReducer';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';

type State = {
    password: string;
    showPassword: boolean;
    email: string;
}
export const Login = () => {
    const dispatch = useAppDispatch();
    const [values, setValues] = useState<State>({
        password: '',
        showPassword: false,
        email: '',
    });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const isAuth = useSelector<RootStateType, boolean>(state => state.login.isAuth);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validationSchema: Yup.object({

            password: Yup.string()
                .min(10, 'Must be 10 characters or more')
                .required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
        }),
        onSubmit: values => {

            dispatch(setLoginT(values));
            formik.resetForm();
        },
    });
    {
        if (isAuth) return <Navigate to={'/'}/>
    }
    return (
        <div className={s.wrapper}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 5,
                    border: '2px solid lightgrey',
                    borderRadius: 3,
                    width: 350,
                    height: '90%',
                    overflow: 'auto',
                    backgroundColor: 'whitesmoke',
                }}
            >
                <Grid container justifyContent={'center'} sx={{margin: 'auto'}}>
                    <Grid container justifyContent={'center'} alignItems={'center'}>
                        <form onSubmit={formik.handleSubmit}>

                            <FormLabel sx={{marginBottom: 5}}>
                                <h2 style={{textAlign: 'center'}}>Sign In</h2>
                            </FormLabel>
                            <FormControl>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input
                                    id={'email'}
                                    type={'text'}
                                    {...formik.getFieldProps('email')}
                                />
                                {formik.touched.email && formik.errors.email
                                    ? <div style={redStyle}>{formik.errors.email}</div>
                                    : null}
                            </FormControl>
                            <div style={{height: '10px'}}></div>
                            <FormControl>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input
                                    id="password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    {...formik.getFieldProps('password')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }

                                />
                                {formik.touched.password && formik.errors.password
                                && <div style={redStyle}>{formik.errors.password}</div>}
                            </FormControl>

                            <FormControl>
                                <FormControlLabel
                                    sx={{margin: '15% 0% 0% 5%'}}
                                    label={'Remember me'}
                                    control={
                                        <Checkbox
                                            size={'small'}
                                            {...formik.getFieldProps('rememberMe')}
                                        />
                                    }/>

                                <Button
                                    style={fontSizeButtonAuth}
                                    sx={{
                                        marginTop: '30%',
                                        height: '20%',
                                        width: '100%',
                                        borderRadius: 10,
                                    }}
                                    type={'submit'} variant={'contained'} color={'primary'}>
                                    Login
                                </Button>
                            </FormControl>
                        </form>

                    </Grid>
                    <Grid item
                          sx={{
                              marginTop: '30px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexDirection: 'column',

                          }}
                    >
                        <div style={{fontSize: '0.7rem'}}>Don`t have an account?</div>
                    </Grid>
                    <Grid container sx={{
                        marginTop: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',

                    }}>
                        <Typography style={{fontSize: '0.7rem'}}>
                            email: <span style={{color: colorBlueMI, marginLeft: '10px'}}>lelik21212121@gmail.com</span>
                            <br/>
                            password: <span style={{color: colorBlueMI, marginLeft: '10px'}}>enter_free</span>
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}