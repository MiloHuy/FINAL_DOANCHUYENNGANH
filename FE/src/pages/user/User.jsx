import { sidebarIconsUser } from "components/icon/sidebar-user.icon"
import Sidebar from "components/sidabar/Sidebar"
import { useState } from "react"
import { Outlet } from 'react-router'

const User = () => {
    const [darkmode, setDarkMode] = useState('light')

    const handleDarkMode = (value) => {
        setDarkMode(value)
    }

    return (
        <div className={`grid grid-cols-11 gap-2 h-screen bg-background ${darkmode} overflow-auto`}>
            <div className='col-span-2 overflow-auto'>
                <Sidebar icons={sidebarIconsUser} handleController={handleDarkMode} className='h-full' />
            </div>

            <div className='col-span-9'>
                <Outlet />
            </div>
        </div>
    )
}

export default User
