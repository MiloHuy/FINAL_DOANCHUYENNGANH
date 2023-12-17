import { selectIsAuthenticated, selectRole, setUserInfo } from "app/slice/auth/auth.slice"
import FormLogin from "features/form-login"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { get_user } from "services/auth.svc"

const Authen = () => {
    const dispatch = useDispatch()

    const role = useSelector(selectRole)

    const isAuthen = useSelector(selectIsAuthenticated)


    useEffect(() => {
        getUserInfo()
    }, [])

    const getUserInfo = async () => {
        try {
            if (!isAuthen) {
                const response = await get_user()
                if (response.success) {
                    console.log(response.user);
                    dispatch(setUserInfo(response.user))
                }
            }
        } catch (error) {

        }
    }

    return (
        isAuthen ?
        (role === 'admin') ? <Navigate to={'/admin'} /> : <Navigate to={'/users'} />
        :
        <div className='flex justify-center items-center w-screen h-screen bg-bg_login bg-cover px-2'>
            <div className="relative flex justify-center h-4/5 w-1/2 rounded-lg border-2 bg-transparent backdrop-blur-sm opacity-100 drop-shadow-md z-20">
                <FormLogin />
            </div>
        </div>
    )
}

export default Authen
