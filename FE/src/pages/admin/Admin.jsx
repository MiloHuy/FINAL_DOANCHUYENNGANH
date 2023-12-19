import { Spinner } from "@nextui-org/react"
import { selectIsAuthenticated, selectRole, setUserInfo } from "app/slice/auth/auth.slice"
import { sidebarIcons } from "components/icon/sidebar-admin.icon"
import Sidebar from "components/sidabar/Sidebar"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet } from 'react-router'
import { Navigate } from "react-router-dom"
import { toast } from "react-toastify"
import { get_user } from "services/auth.svc"


const Admin = () => {
    const dispatch = useDispatch()

    const [darkmode, setDarkMode] = useState('light')
    const isAuthen = useSelector(selectIsAuthenticated)

    const role = useSelector(selectRole)

    const handleDarkMode = (value) => {
        setDarkMode(value)
    }

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
        }
    }

    return (
        isAuthen ?
            (role === 'admin') ?
                <div className={`grid grid-cols-9 gap-2 h-screen bg-background  ${darkmode}`}>
                    <div className='col-span-2'>
                        <Sidebar icons={sidebarIcons} handleController={handleDarkMode} className='h-full' />
                    </div>

                    <div className={`col-span-7 ${darkmode}`}>
                        <Outlet />
                    </div>
                </div> :
                <Navigate to={'/users'} />
            :
            <div className="w-full h-full flex justify-center content-center">
                <Spinner />
            </div>
    )
}

export default Admin
