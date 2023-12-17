// UserList.tsx
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material'
import { AuthState } from '../../store/auth/authType'
import { logout } from '../../store/auth/authAction'
import HomeIcon from '@mui/icons-material/Home'
import { connect } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit'

const mapStateToProps = (state: AuthState) => ({
    auth: state, // Adjust accordingly to your actual state structure
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    logout: () => dispatch(logout()),
});

interface AuthComponentProps {
    auth: AuthState
    logout: () => void;
}

const Header: React.FC<AuthComponentProps> = ({ auth, logout }) => {

    const handleLogout = () => {
        logout()
    }

    useEffect(() => {
    }, [auth])
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography>
                    <Button component={Link} to="/feeds" color="inherit">
                        <HomeIcon fontSize="large" />
                        Feed
                    </Button>
                    {
                        auth.isLogin
                            ? <>
                                <Button component={Link} to="/users" color="inherit">
                                    Users
                                </Button>
                                <Button component={Link} to="/posts" color="inherit">
                                    Posts
                                </Button></>
                            : null
                    }
                </Typography>
                <Box sx={{ flex: 1 }} />
                <Box>
                    {auth.isLogin
                        ? <Button onClick={() => handleLogout()} component={Link} to="/login" color="inherit">
                            Logout
                        </Button>
                        : <Button component={Link} to="/login" color="inherit">
                            Login
                        </Button>
                    }
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
