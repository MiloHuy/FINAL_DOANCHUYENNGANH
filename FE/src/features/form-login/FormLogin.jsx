import { Home, KeyRound } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Input } from '@nextui-org/react';
import { setCredentials } from 'app/slice/auth/auth.slice';
import clsx from 'clsx';
import { SSOCOOKIES } from 'constants/app.const';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { login } from 'services/auth.svc';
import { object, string } from 'yup';

const FormLogin = (props) => {
    const navigate = useNavigate()

    const initFormLogin = {
        username: '',
        password: ''
    }
    const [formLogin, setFormLogin] = useState(initFormLogin)

    const dispatch = useDispatch()

    const handleSubmitLogin = async (e) => {
        e.preventDefault()

        try {
            const userData = await login(values)
            console.log('User data: ', userData)
            dispatch(setCredentials({ ...userData, values }))
            Cookies.set(SSOCOOKIES.access, userData.token, { expires: 1 })

            toast.success('Đăng nhập thành công!!!', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setTimeout(() => {
                if (userData.user.role === 'user')
                    navigate('/users')
                else if (userData.user.role === 'admin')
                    navigate('/admin')
            }, 3000)

        } catch (err) {
            console.log("errorMessage: " + Object.entries(err.response))

            toast.error(`Đăng nhập thất bại`, {
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

    const handleGoHome = () => {
        navigate('/')
    }

    const handleInput = (e) => {
        setFormLogin({ ...formLogin, [e.target.name]: e.target.value })
    }

    const formLabel = useMemo(() => ({
        username: 'User Name',
        password: 'Password',
    }), [])

    const formLoginSchema = useMemo(() => {
        return object().shape({
            username: string().typeError(`${formLabel.username}`).required(`${formLabel.username} is required`),
            password: string().typeError(`${formLabel.password}`).required(`${formLabel.password} is required`),
        })
    }, [formLabel])

    const formik = useFormik({
        initialValues: formLogin,
        validationSchema: formLoginSchema,
        handleChange: { handleInput },
        handleSubmit: { handleSubmitLogin }
    })

    const { values, errors } = formik
    console.log("Values:", Object.values(values))

    return (
        <form
            className={clsx('h-full w-2/3 flex flex-col items-center justify-center', props.className)}
            onSubmit={formik.handleSubmit}
        >

            <h1 className='text-lg text-black font-bold font-merriweather text-center'>LOGIN</h1>

            <Input
                name='username'
                type='text'
                className='py-[10px] px-[15px] text-sm my-[8px] mx-0 rounded-sm w-4/5'
                placeholder='Please enter your username'
                onChange={formik.handleChange}
            />

            <Input
                name='password'
                type='password'
                className='py-[10px] px-[15px] text-sm my-[8px] mx-0 rounded-sm w-4/5'
                placeholder="Password"
                onChange={formik.handleChange}
            />

            <div className='flex flex-row gap-2 justify-center w-2/3'>
                <Button
                    onClick={handleSubmitLogin}
                    className='text-sm font-merriweather text-black'
                    endContent={<KeyRound size={16} />}
                >
                    LOGIN
                </Button>

                <Button
                    onClick={handleGoHome}
                    className='text-sm font-merriweather'
                    endContent={<Home size={16} />}
                >
                    GO HOME
                </Button>

            </div>
        </form>
    )
}

export default FormLogin
