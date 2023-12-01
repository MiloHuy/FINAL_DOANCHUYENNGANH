import { Button, Input } from "@nextui-org/react";
import clsx from "clsx";
import { useFormik } from "formik";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { createAccount } from "services/admin.svc";
import { object, string } from "yup";

const FormCreateUser = (props) => {
    const dispatch = useDispatch()

    const initFormCreateUser = {
        name: '',
        username: '',
        password: ''
    }

    const [formCreateUser, setFormCreateUser] = useState(initFormCreateUser)

    const handleInput = (e) => {
        setFormCreateUser({ ...formCreateUser, [e.target.name]: e.target.value })
    }

    const formLabel = useMemo(() => ({
        name: 'Name',
        username: 'Username',
        password: 'Password'
    }), [])

    const formCreateUserSchema = useMemo(() => {
        return object().shape({
            name: string(),
            username: string(),
            password: string().min(6, 'Tối thiểu 6 kí tự'),
        })
    }, [])

    const handleCreateUserForm = async () => {
        try {
            const user_data = await createAccount(values)
            console.log("user_data: ", user_data)
            toast.success('Tạo tại khoản thành công!!!', {
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
        catch (err) {
            console.log("Error: ", err)

            toast.error('Tạo tài khoản thất bại!!!', {
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

    const formik = useFormik({
        initialValues: formCreateUser,
        validationSchema: formCreateUserSchema,
        handleChange: { handleInput },
        handleSubmit: { handleCreateUserForm }
    })

    const { values, errors } = formik

    console.log("Value: " + Object.entries(values))

    return (
        <form
            className={clsx('flex flex-col gap-3 items-center justify-center p-4 w-full h-full border rounded-lg', props.className)}
            onSubmit={formik.handleSubmit}
        >
            <h1 className="text-lg font-bold font-merriweather text-center dark:text-white ">
                Create account
            </h1>

            <div className='grid grid-rows-3 gap-3 w-3/4'>
                <Input
                    isRequired
                    type="text"
                    name='name'
                    label={formLabel.name}
                    defaultValue=""
                    className="w-full"
                    onChange={formik.handleChange}
                />

                <Input
                    isRequired
                    type="text"
                    name='username'
                    label={formLabel.username}
                    defaultValue=""
                    className="w-full"
                    onChange={formik.handleChange}
                />

                <Input
                    isRequired
                    type="password"
                    name='password'
                    label={formLabel.password}
                    defaultValue=""
                    className="w-full"
                    errorMessage={errors?.password}
                    onChange={formik.handleChange}
                />
            </div>

            <Button
                className="w-1/3 text-sm font-merriweather"
                onClick={handleCreateUserForm}
                type='submit'
            >
                Sign up
            </Button>

        </form>
    )
}

export default FormCreateUser