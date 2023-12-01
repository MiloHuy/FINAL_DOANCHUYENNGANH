import { Input } from '@nextui-org/react'
import clsx from "clsx"
import { useCallback, useEffect, useState } from 'react'
import { getUserTopics } from 'services/guest.svc'

const FormViewUser = (props) => {
    const { userInfo } = props
    const { _id, name } = userInfo

    const [userInfoGuest, setUserInfo] = useState()

    const [filter, setFilter] = useState({
        page: 1,
        size: 4,
        search: '',
    })

    const fetchUserInfo = useCallback(async () => {
        try {
            const data = await getUserTopics('6561fd2874dcd702e5229391', filter)
            setUserInfo(data.data)
        } catch (error) {

        }
    }, [])

    useEffect(() => {
        fetchUserInfo()

    }, [fetchUserInfo])

    return (
        <form
            className={clsx('h-full w-full p-0 items-center justify-center dark:bg-black', props.className)}
        >
            <h1 className='text-md font-bold font-merriweather text-center dark:text-white'>Detail topics of user</h1>

            <div className='grid grid-cols-2 gap-2'>
                <Input
                    name='name'
                    label="NAME"
                    isReadOnly
                    variant='underlined'
                    type='text'
                    value={name}
                    className='py-[10px] px-[15px] text-sm my-[8px] mx-0 rounded-sm w-full'
                />

                {/* <Input
                    name='phone'
                    isReadOnly
                    label="PHONE"
                    variant='underlined'
                    type='text'
                    value={phone}
                    className='py-[10px] px-[15px] text-sm my-[8px] mx-0 rounded-sm w-full'
                />
                <Input
                    name='email'
                    isReadOnly
                    variant='underlined'
                    label="EMAIL"
                    type='text'
                    value={email}
                    className='py-[10px] px-[15px] text-sm my-[8px] mx-0 rounded-sm w-full'
                />
                <Input
                    name='degree'
                    isReadOnly
                    variant='underlined'
                    label="DEGREE"
                    type='text'
                    value={degree}
                    className='py-[10px] px-[15px] text-sm my-[8px] mx-0 rounded-sm w-full'
                /> */}
            </div>
        </form>
    )
}

export default FormViewUser
