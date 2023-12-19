import React, { useEffect, useState } from 'react'
import { Button, TextField, Typography, Container, CssBaseline } from '@mui/material'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { login } from '../../../store/auth/authAction';
import { Dispatch } from '@reduxjs/toolkit';
import { AuthState } from '../../../store/auth/authType'
import AlertMassage from '../../common/AlertMassage';
import { RootState } from '../../../store/store';

interface AuthComponentProps {
    prop: RootState
    login: (email: string, password: string) => void;
}
interface DispatchProps {
    login: (email: string, password: string) => void;
}
const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
    login: (email, password) => dispatch(login(email, password)),
});
const mapStateToProps = (state: RootState) => ({
    prop: state,
});

const Login: React.FC<AuthComponentProps> = ({ prop, login }) => {
    const nevigate = useNavigate()
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const alert = useSelector((state: RootState) => state.alert);

    const handleLogin = async () => {
        console.log("handleLogin")
        login(username, password);
    };

    if (prop.auth.token) {
        console.log("prop token:", prop.auth.token)
        nevigate('/users')
    }


    return (
        <Container component="main" maxWidth="xs">
            {alert.open
                ? <AlertMassage message={alert.message} status={alert.status} />
                : null}
            <CssBaseline />
            <div className="paper">
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <form className="form">
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="submit"
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
