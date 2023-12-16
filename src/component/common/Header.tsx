// UserList.tsx
import React, { useEffect } from 'react'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material'
import { AppState } from '../../store/rootReducer'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../store/type'
import { connect } from 'react-redux'
import { logout } from '../../store/auth/authAction'
import HomeIcon from '@mui/icons-material/Home'

const mapState = (state: AppState) => ({
    auth: state.authReducer,
})

const mapDispatch = (dispatch: ThunkDispatch<AppState, {}, AppActions>) => ({
    logout: () => dispatch(logout())
})

const withConnect = connect(mapState, mapDispatch)

type WithConnectProps = ReturnType<typeof mapState> &
    ReturnType<typeof mapDispatch>

const Header: React.FC<WithConnectProps & RouteComponentProps> = ({
    ...props
}) => {

    const handleLogout = () => {
        props.logout()
    }

    useEffect(() => {
    }, [props.auth])
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography>
                    <Button component={Link} to="/feeds" color="inherit">
                        <HomeIcon fontSize="large" />
                        Feed
                    </Button>
                    {
                        props.auth.isLogin
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
                    {props.auth.isLogin
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

export default withRouter(withConnect(Header))
