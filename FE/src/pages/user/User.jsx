import { Spinner } from "@nextui-org/react"
import { selectIsAuthenticated, selectRole, setUserInfo } from "app/slice/auth/auth.slice"
import { sidebarIconsUser } from "components/icon/sidebar-user.icon"
import Sidebar from "components/sidabar/Sidebar"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet } from 'react-router'
import { Navigate, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { get_user } from "services/auth.svc"

const User = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [darkmode, setDarkMode] = useState('light')

    const isAuthen = useSelector(selectIsAuthenticated)
    const role = useSelector(selectRole)

    const handleDarkMode = (value) => {
        setDarkMode(value)
    }

    useEffect(() => {
        if (!isAuthen) {
            getUserInfo()
        }
    }, [isAuthen])

    const getUserInfo = async () => {
        try {
            const response = await get_user()
            if (response.success) {
                console.log(response.user);
                dispatch(setUserInfo(response.user))
            }
        } catch (error) {
            console.log('error:', error.response.data)

            const { code } = error.response.data
            if (code) {
                toast.error(`Không đủ quyền truy cập. Vui lòng đăng nhập`, {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                navigate('/')
            }
        }
    }

    return (
        isAuthen ?
            (role === 'user') ?
                <div className={`grid grid-cols-11 gap-2 h-screen bg-background ${darkmode} overflow-auto`}>
                    <div className='col-span-2 overflow-auto'>
                        <Sidebar icons={sidebarIconsUser} handleController={handleDarkMode} className='h-full' />
                    </div>

                    <div className={`col-span-9 ${darkmode}`}>
                        <Outlet />
                    </div>
                </div>
                :
                <Navigate to={'/admin'} />
            :
            <div className="w-screen h-screen flex justify-center content-center">
                <Spinner />
            </div>
    )
}

export default User
