import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Spinner, useDisclosure } from '@nextui-org/react';
import clsx from "clsx";
import ModalChangeAvatar from 'features/modal-change-avatar';
import { useFormik } from 'formik';
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from 'react-toastify';
import { getUserInfo, updateInfoUser } from "services/user.svc";
import { object, string } from 'yup';

const FormDetailUser = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setDisabled] = useState(true)
    const [userInfo, setUserInfo] = useState()
    const { onOpen, onClose } = useDisclosure();
    const [openModal, setOpenModal] = useState(false)

    const [formUserDetail, setFormUserDetail] = useState({
        phone: '',
        email: '',
        degree: '',
        image: null
    })

    const fetchUserInfo = useCallback(async () => {
        try {
            const data = await getUserInfo()
            setUserInfo(data.data)

        } catch (error) {

        }
    }, [])

    const handleSaveChanges = () => {
        setDisabled(!isDisabled)

        values['phone'] = userInfo.user.phone
        values['email'] = userInfo.user.email
        values['degree'] = userInfo.user.degree

        handleChangeAvatar()
    }

    useEffect(() => {
        fetchUserInfo()
    }, [fetchUserInfo])

    const handleOpenModal = () => {
        if (openModal === false) {
            setOpenModal(true)
            onOpen()
        }
    }

    const handleCloseModal = () => {
        if (openModal === true) {
            setOpenModal(false)
            onClose()
        }
    }

    const handleChangeAvatar = (image) => {
        console.log('imag: ' + image)
        if (image) {
            values['image'] = image
        }
    }

    const handleSubmitUserDetail = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            await updateInfoUser(values)

            setIsLoading(false)
            toast.success('Chỉnh sửa thông tin thành công!!!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            setDisabled(!isDisabled)

        } catch (err) {
            setIsLoading(false)
            const { code } = err.response.data;

            if (code) {
                toast.error('Vui lòng nhập số điện thoại hợp lệ ở Việt Nam', {
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
    }

    const handleInput = (e) => {
        setFormUserDetail({ ...formUserDetail, [e.target.name]: e.target.value })

        handleChangeAvatar()
    }

    const formLabel = useMemo(() => ({
        phone: 'PHONE',
        email: 'EMAIL',
        degree: 'DEGREE',
        image: 'IMAGE',
    }), [])

    const formUserDetailSchema = useMemo(() => {
        return object().shape({
            phone: string().required().max(10, 'Hãy nhập đủ 10 chữ số'),
            email: string().required(),
            degree: string(),
        })
    }, [])

    const formik = useFormik({
        initialValues: formUserDetail,
        validationSchema: formUserDetailSchema,
        handleChange: { handleInput },
        handleSubmit: { handleSubmitUserDetail }
    })

    const { values, errors } = formik

    return (
        userInfo
            ?
            <form
                className={clsx('flex flex-col h-full w-full p-0 gap-3 items-center justify-center dark:bg-black', props.className)}>
                <h1 className='text-md font-bold font-merriweather text-center dark:text-white'>Detail user</h1>

                <div className='flex gap-2'>
                    <div className='grid grid-cols-1 gap-2 w-[400px] '>
                        <Input
                            name='phone'
                            label={formLabel.phone}
                            isReadOnly={isDisabled}
                            onChange={formik.handleChange}
                            defaultValue={userInfo.user.phone}
                            variant='underlined'
                            type='text'
                            errorMessage={errors.phone}
                            className='py-[10px] px-[15px] text-sm my-[8px] mx-0 rounded-sm w-full'
                        />

                        <Input
                            name='email'
                            isReadOnly={isDisabled}
                            label={formLabel.email}
                            onChange={formik.handleChange}
                            variant='underlined'
                            defaultValue={userInfo.user.email}
                            type='text'
                            className='py-[10px] px-[15px] text-sm my-[8px] mx-0 rounded-sm w-full'
                        />
                        <Input
                            name='degree'
                            isReadOnly={isDisabled}
                            variant='underlined'
                            defaultValue={userInfo.user.degree}
                            onChange={formik.handleChange}
                            label={formLabel.degree}
                            type='text'
                            className='py-[10px] px-[15px] text-sm my-[8px] mx-0 rounded-sm w-full'
                        />
                    </div>

                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <img
                                alt='avatar'
                                as="button"
                                className="w-[250px] h-full"
                                src={userInfo.user.image === null ? 'https://cdn-icons-png.flaticon.com/512/149/149071.png' : userInfo.user.image}
                            />
                        </DropdownTrigger>

                        <DropdownMenu aria-label="Profile" variant="flat">
                            <DropdownItem
                                onClick={handleOpenModal}
                                key="profile"
                                className="h-10 gap-2">
                                <p className="font-semibold">Đổi ảnh đại diện</p>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                    <ModalChangeAvatar
                        isOpen={openModal}
                        onOpenChange={handleOpenModal}
                        onClose={handleCloseModal}

                        handleChangeAvatar={handleChangeAvatar}
                    />
                </div>

                <div className='flex gap-4 justify-start w-3/4 '>
                    <Button
                        className="text-sm font-merriweather"
                        isDisabled={!isDisabled}
                        onClick={handleSaveChanges}
                        variant="bordered"
                    >
                        UPDATE
                    </Button>

                    <Button
                        isLoading={isLoading}
                        className=" text-sm font-merriweather"
                        isDisabled={isDisabled}
                        onClick={handleSubmitUserDetail}
                        variant="bordered"
                    >
                        CHANGE
                    </Button>
                </div>
            </form>
            :
            <div className="w-full h-full flex items-center justify-center">
                <Spinner size="lg" label="Loading" color="default" />
            </div>

    )
}

export default FormDetailUser
