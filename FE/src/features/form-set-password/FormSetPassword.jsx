import { useMemo, useState } from 'react'

import { Button, Input } from '@nextui-org/react'
import clsx from 'clsx'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { updatePassword } from 'services/admin.svc'
import { object, string } from 'yup'

const FormSetPassword = (props) => {
    const dispatch = useDispatch()
    const { usernameInfo } = props
    const { username, _id } = usernameInfo

    const initFormSetPassWord = {
        password: ''
    }
    const [formSetPassWord, setFormSetPassWord] = useState(initFormSetPassWord)


    const handleSubmitSetPassWord = async (e) => {
        e.preventDefault()

        try {
            await updatePassword(_id, values)

            toast.success('Đặt lại mật khẩu thành công!!!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        } catch (err) {
            console.error(err)
            toast.error('Đặt lại mật khẩu thất bại!!!', {
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
        setFormSetPassWord({ ...formSetPassWord, [e.target.name]: e.target.value })
    }

    const formLabel = useMemo(() => ({
        username: 'User Name',
        password: 'Password',
    }), [])

    const formSetPassWordSchema = useMemo(() => {
        return object().shape({
            password: string()
                .typeError(`${formLabel.password}`)
                .required(`${formLabel.password} is required`)
                .min(6, 'Tối thiểu 6 kí tự'),
        })
    }, [formLabel])

    const formik = useFormik({
        initialValues: formSetPassWord,
        validationSchema: formSetPassWordSchema,
        handleChange: { handleInput },
        handleSubmit: { handleSubmitSetPassWord }
    })

    const { values, errors } = formik
    console.log("Values:", Object.values(values))

    return (
        <form
            className={clsx('h-full w-full flex flex-col items-center justify-center', props.className)}
            onSubmit={formik.handleSubmit}
        >

            <h1 className='text-lg   font-bold font-merriweather text-center'>SetPassWord</h1>

            <Input
                name='username'
                isReadOnly
                type='text'
                value={username}
                className='py-[10px] px-[15px] text-sm my-[8px] mx-0 rounded-sm w-full'
                placeholder='Please enter your username'
                onChange={formik.handleChange}
            />

            <Input
                name='password'
                type='password'
                className='py-[10px] px-[15px] text-sm my-[8px] mx-0 rounded-sm w-full'
                placeholder="Reset your password"
                errorMessage={errors?.password}
                onChange={formik.handleChange}
            />
            <div className='flex justify-end pr-4 w-full'>
                <Button
                    className=" text-sm font-merriweather"
                    onClick={handleSubmitSetPassWord}
                    variant="bordered"
                    type='submit'
                >
                    Save
                </Button>
            </div>


        </form>
    )
}

export default FormSetPassword
