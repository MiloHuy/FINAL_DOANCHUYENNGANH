import { sidebarIcons } from "components/icon/sidebar-admin.icon"
import Sidebar from "components/sidabar/Sidebar"
import { useState } from "react"
import { Outlet } from 'react-router'


const Admin = () => {
    const [darkmode, setDarkMode] = useState('light')

    const handleDarkMode = (value) => {
        setDarkMode(value)
    }

    return (
        <div className={`grid grid-cols-9 gap-2 h-screen bg-background  ${darkmode}`}>
            <div className='col-span-2'>
                <Sidebar icons={sidebarIcons} handleController={handleDarkMode} className='h-full' />
            </div>

            <div className='col-span-7'>
                <Outlet />
            </div>
        </div>
    )
}

export default Admin
