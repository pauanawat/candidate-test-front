import React, { useState } from 'react'
import { Button, TextField, Typography, Container, CssBaseline } from '@mui/material'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { login } from '../../../store/auth/authAction';
import { Dispatch } from '@reduxjs/toolkit';
import { AuthState } from '../../../store/auth/authType'

interface AuthComponentProps {
    auth: AuthState
    login: (email: string, password: string) => void;
}
interface DispatchProps {
    login: (email: string, password: string) => void;
}
const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
    login: (email, password) => dispatch(login(email, password)),
});
const mapStateToProps = (state: AuthState) => ({
    auth: state, // Adjust accordingly to your actual state structure
});
export interface LoginValues {
    email: string
    password: string
}

const Login: React.FC<AuthComponentProps> = ({ auth, login }) => {
    const nevigate = useNavigate()
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const dispatch = useDispatch()

    const handleLogin = async () => {
        console.log("handleLogin")
        login(username, password);

    };

    if (auth.token) {
        nevigate('/users')
    }

    return (
        <Container component="main" maxWidth="xs">
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
