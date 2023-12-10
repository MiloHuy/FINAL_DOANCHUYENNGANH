import { Button, useDisclosure } from '@nextui-org/react';
import ListInfoUser from 'features/list-info-user';
import ModalListSinhvien from 'features/modal-list-sinhvien';
import { Link } from 'react-router-dom';

const Public = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleShowSinhVien = () => {
        onOpen()
    }

    return (
        <div className='h-screen w-full px-3 py-4 overflow-auto'>
            <div className='grid grid-cols-1 gap-2 h-full w-full '>
                <div className='flex items-start justify-between h-10'>
                    <h1 className='text-lg font-bold font-merriweather  dark:text-white w-90 text-center'>
                        Đây là trang quản lý đề tài của khoa công nghệ thông tin
                    </h1>

                    <Button
                        variant="light"
                        className='text-sm font-bold font-merriweather'>

                        <Link to='./login'>Login</Link>
                    </Button>
                </div>

                <div className='flex justify-center gap-2 '>
                    <div className='w-3/4 p-2 relative justify-center'>
                        <ListInfoUser />
                    </div>
                </div>

                <div className='flex relative justify-start items-end gap-2 '>
                    <Button
                        variant="bordered"
                        className='text-sm font-bold font-merriweather'
                        onClick={handleShowSinhVien}
                    >
                        Danh sách sinh viên tham gia
                    </Button>

                    <ModalListSinhvien
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}
                    />
                </div>
            </div>

        </div>
    )
}

export default Public
