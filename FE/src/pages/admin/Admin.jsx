import { selectIsAuthenticated, selectRole, setUserInfo } from "app/slice/auth/auth.slice"
import { sidebarIcons } from "components/icon/sidebar-admin.icon"
import Sidebar from "components/sidabar/Sidebar"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet } from 'react-router'
import { toast } from "react-toastify"
import { get_user } from "services/auth.svc"
import { Navigate } from "react-router-dom"
import { Spinner } from "@nextui-org/react"


const Admin = () => {
    const dispatch = useDispatch()

    const [darkmode, setDarkMode] = useState('light')

    const [firstRender, setFirstRender] = useState(true)

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
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } finally {
            setFirstRender(false)
        }
    }

    return (
        isAuthen ?
            (role === 'admin') ?
                <div className={`grid grid-cols-9 gap-2 h-screen bg-background  ${darkmode}`}>
                    <div className='col-span-2'>
                        <Sidebar icons={sidebarIcons} handleController={handleDarkMode} className='h-full' />
                    </div>

                    <div className='col-span-7'>
                        <Outlet />
                    </div>
                </div> :
                <Navigate to={'/users'} />
            :
            firstRender ?
                <div className="w-screen h-screen flex justify-center content-center">
                    <Spinner />
                </div>
                :
                <Navigate to={'/'} />
    )
}

export default Admin
