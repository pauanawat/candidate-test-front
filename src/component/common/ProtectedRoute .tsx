import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useEffect } from "react";

const ProtectedRoute = () => {
    const navigate = useNavigate();
    const isNotAuthenticated = useSelector((state: RootState) => !state.auth.token);
    useEffect(() => {
        if (isNotAuthenticated) {
            console.log(isNotAuthenticated)
            navigate("/login");
        }
    }, [])

    return (
        <Outlet />
    );
};
export default ProtectedRoute