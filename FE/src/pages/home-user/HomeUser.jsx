import { getUserInfoRedux } from "app/slice/user/user.slice"
import { useCallback, useEffect } from "react"
import { useDispatch } from 'react-redux'
import { getUserInfo } from "services/user.svc"

const HomeUser = () => {

    const dispatch = useDispatch()

    const fetchUserInfo = useCallback(async () => {
        const data = await getUserInfo()
        dispatch(getUserInfoRedux(data.data))

    }, [dispatch])

    useEffect(() => {
        fetchUserInfo()

    }, [fetchUserInfo])

    return (
        <div className="flex justify-center items-center flex-col gap-2 h-full">
            <h1 className='text-sm text-black dark:text-white font-bold font-merriweather text-center'>
                XIN CHÀO.
            </h1>
            <h1 className='text-sm text-black dark:text-white font-bold font-merriweather text-center'>
                VUI LÒNG CHỌN CÁC MỤC ĐỂ CHỈNH SỬA.
            </h1>
        </div>
    )
}

export default HomeUser