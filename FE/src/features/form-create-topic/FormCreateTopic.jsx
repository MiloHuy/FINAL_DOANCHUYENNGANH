import { Button, Input } from "@nextui-org/react";
import clsx from "clsx";
import { useFormik } from "formik";
import { useMemo, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { toast } from 'react-toastify';
import { createTopicUser } from "services/user.svc";
import { object, string } from "yup";

const FormCreateTopics = (props) => {
    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });

    const handleValueChange = (newValue) => {
        setValue(newValue);
    }

    const initFormCreateTopics = {
        name: '',
        description: '',
        beginAt: value.startDate,
        endAt: value.endDate
    }

    const [formCreateTopics, setFormCreateTopics] = useState(initFormCreateTopics)

    const handleInput = (e) => {
        setFormCreateTopics({ ...formCreateTopics, [e.target.name]: e.target.value })
    }

    const formLabel = useMemo(() => ({
        name: 'Name',
        description: "Description",
        beginAt: 'Begin at',
        endAt: 'End at",'
    }), [])

    const formCreateTopicsSchema = useMemo(() => {
        return object().shape({
            name: string().required(),
            description: string().required(),
            beginAt: string().required(),
            endAt: string().required(),
        }, [])
    })

    const handleCreateUserForm = async () => {
        try {
            values['beginAt'] = value.startDate
            values['endAt'] = value.endDate

            await createTopicUser(values)

            toast.success('Tạo đề tài thành công!!!', {
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

            toast.error('Tạo đề tài thất bại!!!', {
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
        initialValues: formCreateTopics,
        validationSchema: formCreateTopicsSchema,
        handleChange: { handleInput },
        handleSubmit: { handleCreateUserForm }
    })

    const { values, errors } = formik

    return (
        <form
            className={clsx('flex flex-col gap-3 items-center justify-start p-4 w-full h-full rounded-lg ', props.className)}
            onSubmit={formik.handleSubmit}
        >
            <h1 className="text-lg font-bold font-merriweather text-center dark:text-white ">
                Create topics
            </h1>

            <div className='grid grid-rows-3 gap-5 w-3/4'>
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
                    name='description'
                    label={formLabel.description}
                    defaultValue=""
                    className="w-full"
                    onChange={formik.handleChange}
                />

                <div className="h-full flex items-center border rounded-lg">
                    <Datepicker
                        primaryColor={"sky"}
                        inputClassName="w-full rounded-md font-normal  dark:bg-black dark:placeholder:text-white dark:text-white "
                        value={value}
                        onChange={handleValueChange}
                        displayFormat={"DD/MM/YYYY"}
                        popoverDirection='down'
                        classNames='border-none'
                    />
                </div>


            </div>

            <Button
                className="w-1/3 text-sm font-merriweather"
                onClick={handleCreateUserForm}
                type='submit'
            >
                Create topics
            </Button>

        </form>
    )
}

export default FormCreateTopics
