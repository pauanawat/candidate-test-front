import React, { useState } from 'react'
import { Button, TextField, Typography, Container, CssBaseline } from '@mui/material'
import './Login.css'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../store/auth/authAction';
import { selectTokenData } from '../../../store/auth/authSelector';
export interface LoginValues {
    email: string
    password: string
}

const Login: React.FC = () => {
    const history = useHistory()
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const dispatch = useDispatch()
    const token = useSelector(selectTokenData)

    const handleLogin = async () => {
        console.log("handleLogin")
        dispatch(login(username, password));

    };

    if (token) {
        history.push('/users')
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

export default Login;
