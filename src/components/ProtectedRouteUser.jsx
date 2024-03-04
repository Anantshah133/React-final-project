import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const ProtectedRouteUser = ({ isLoggedIn, Comp }) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn){
            navigate('/login');
        }
    }, [isLoggedIn]);
    return <Comp />
}

export default ProtectedRouteUser;