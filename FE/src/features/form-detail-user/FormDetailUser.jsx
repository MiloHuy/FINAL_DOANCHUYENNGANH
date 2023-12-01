import { Button, Input } from '@nextui-org/react';
import clsx from "clsx";
import { useFormik } from 'formik';
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getUserInfo, updateInfoUser } from "services/user.svc";
import { object, string } from 'yup';

const FormDetailUser = (props) => {
    const dispatch = useDispatch()

    const [isDisabled, setDisabled] = useState(true)
    const [userInfo, setUserInfo] = useState()

    const defaultValuesInfo = useSelector(state => state.user)

    const fetchUserInfo = useCallback(async () => {
        try {
            const data = await getUserInfo()
            setUserInfo(data.data)
        } catch (error) {

        }
    }, [])

    const handleSaveChanges = () => {
        setDisabled(!isDisabled)
    }

    useEffect(() => {
        fetchUserInfo()
    }, [fetchUserInfo])

    const initFormUserDetail = {
        phone: defaultValuesInfo.phone,
        email: defaultValuesInfo.email,
        degree: defaultValuesInfo.degree,
    }

    const [formUserDetail, setFormUserDetail] = useState(initFormUserDetail)

    console.log("formUserDetail:", formUserDetail)

    const handleSubmitUserDetail = async (e) => {
        e.preventDefault()
        try {
            await updateInfoUser(values)

            fetchUserInfo()

            toast.success('Chỉnh sửa thông tin thành công!!!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            setDisabled(!isDisabled)

        } catch (err) {
            console.error("err: " + err.message);

            toast.error('Chỉnh sửa thông tin thất bại!!!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
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
    console.log("userInfo:", (userInfo))

    return (
        <form
            className={clsx('flex flex-col h-full w-full p-0 gap-3 items-center justify-center dark:bg-black', props.className)}>
            <h1 className='text-md font-bold font-merriweather text-center dark:text-white'>Detail user</h1>

            <div className='grid grid-cols-1 gap-2 w-3/4'>
                <Input
                    name='phone'
                    label={formLabel.phone}
                    isReadOnly={isDisabled}
                    defaultValue={initFormUserDetail.phone}
                    onChange={formik.handleChange}
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
                    defaultValue={initFormUserDetail.email}
                    variant='underlined'
                    type='text'
                    className='py-[10px] px-[15px] text-sm my-[8px] mx-0 rounded-sm w-full'
                />
                <Input
                    name='degree'
                    isReadOnly={isDisabled}
                    variant='underlined'
                    defaultValue={initFormUserDetail.degree}
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
    )
}

export default FormDetailUser
