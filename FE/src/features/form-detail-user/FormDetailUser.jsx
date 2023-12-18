import { Button, Input, Spinner } from '@nextui-org/react';
import clsx from "clsx";
import { useFormik } from 'formik';
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from 'react-toastify';
import { getUserInfo, updateInfoUser } from "services/user.svc";
import { object, string } from 'yup';
import formDetailUser from '.';

const FormDetailUser = (props) => {
    const [isDisabled, setDisabled] = useState(true)
    const [userInfo, setUserInfo] = useState()

    // const initFormUserDetail = 

    const [formUserDetail, setFormUserDetail] = useState({
        phone: '',
        email: '',
        degree: '',
    })

    const fetchUserInfo = useCallback(async () => {
        try {
            const data = await getUserInfo()
            setUserInfo(data.data)

            setFormUserDetail({
                phone: data.data.user.phone,
                email: data.data.user.email,
                degree: data.data.user.degree
            })

        } catch (error) {

        }
    }, [])

    const handleSaveChanges = () => {
        setDisabled(!isDisabled)
    }

    useEffect(() => {
        fetchUserInfo()
    }, [fetchUserInfo])

    const handleSubmitUserDetail = async (e) => {
        e.preventDefault()
        try {
            await updateInfoUser(values)

            fetchUserInfo()

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
            console.error("err: " + Object.entries(err.response));
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
    }

    const formLabel = useMemo(() => ({
        phone: 'PHONE',
        email: 'EMAIL',
        degree: 'DEGREE'
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

    console.log('FormDetails: ' + Object.entries(formDetailUser))

    return (
        userInfo
            ?
            <form
                className={clsx('flex flex-col h-full w-full p-0 gap-3 items-center justify-center dark:bg-black', props.className)}>
                <h1 className='text-md font-bold font-merriweather text-center dark:text-white'>Detail user</h1>

                <div className='grid grid-cols-1 gap-2 w-3/4'>
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
                <div className='flex gap-2 justify-end pr-4 w-3/4'>
                    <Button
                        className=" text-sm font-merriweather"
                        isDisabled={!isDisabled}
                        onClick={handleSaveChanges}
                        variant="bordered"
                    >
                        UPDATE
                    </Button>

                    <Button
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
