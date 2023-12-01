import { Button } from '@nextui-org/react';
import ListInfoUser from 'features/list-info-user';
import { Link } from 'react-router-dom';

const Public = () => {

    return (
        <div className='h-screen w-screen flex p-4 flex-col gap-4'>
            <div className='w-full flex flex-row gap-2 '>
                <h1 className='flex items-center justify-center text-md font-bold font-merriweather text-center dark:text-white'>
                    Đây là trang quản lý đề tài của khoa công nghệ thông tin
                </h1>

                <div className='flex gap-2 justify-end w-full'>
                    <Button variant="light" className='text-sm font-bold font-merriweather text-center'>
                        <Link to='./login'>Login</Link>
                    </Button>
                </div>
            </div>

            <div className='flex justify-center gap-2'>
                <div className='w-3/4 h-full p-2 absolute justify-center'>
                    <ListInfoUser />
                </div>
            </div>

        </div>
    )
}

export default Public
