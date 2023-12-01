import { selectRole } from "app/slice/auth/auth.slice";
import { SSOCOOKIES } from "constants/app.const";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const AuthRequirement = () => {
    const token = Cookies.get(SSOCOOKIES.access);
    const role = useSelector(selectRole)
    const location = useLocation()
    const navigate = useNavigate()

    console.log("role: " + role)

    useEffect(() => {
        if (!token)
            return (
                <Navigate to='/login' state={{ from: location }} replace />
            )

        if (role === 'admin')
            return (
                <Navigate to='/admin' state={{ from: location }} replace />
            )

        if (role === 'user')
            return (
                <Navigate to='/users' state={{ from: location }} replace />

            )
    }, [token, role, location, navigate])



    // return (
    //     token
    //         ?
    //         <Outlet /> : <Navigate to='/login' state={{ from: location }} replace />

    // )
}

export default AuthRequirement
