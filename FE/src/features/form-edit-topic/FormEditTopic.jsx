import { Button, Input } from '@nextui-org/react'
import clsx from "clsx"
import { useFormik } from 'formik'
import { useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { updateTopicUser } from 'services/user.svc'
import { dateTimeFormat, hourTimeFormat } from 'utils/format-date.utils'
import { object, string } from 'yup'

const FormEditTopic = (props) => {
    const { topicsInfo, handleEdit } = props
    const { _id, name, description, beginAt, endAt, createdAt, updatedAt } = topicsInfo

    const initFormEditTopic = {
        name: name,
        description: description,
        beginAt: (beginAt),
        endAt: (endAt),
        createdAt: (createdAt),
        updatedAt: (updatedAt),
    }
    const [formEditTopic, setFormEditTopic] = useState(initFormEditTopic)

    const handleSubmitEditTopic = async (e) => {
        e.preventDefault()
        try {
            await updateTopicUser(_id, values)

            handleEdit(1)

            toast.success('Chỉnh sửa đề tài thành công!!!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        } catch (err) {
            console.error(err)

            handleEdit(0)

            toast.error('Chỉnh sửa đề tài thất bại!!!', {
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

    const handleInput = (e) => {
        setFormEditTopic({ ...formEditTopic, [e.target.name]: e.target.value })
    }

    const formLabel = useMemo(() => ({
        name: 'NAME',
        description: 'DESCRIPTION',
        beginAt: 'BEGIN AT',
        endAt: 'END AT',
        createdAt: 'CREATED AT',
        updatedAt: 'UPDATED AT',
    }), [])

    const formEditTopicSchema = useMemo(() => {
        return object().shape({
            name: string().required(),
            description: string().required(),
            beginAt: string(),
            endAt: string(),
            createdAt: string(),
            updatedAt: string(),
        })
    }, [])

    const formik = useFormik({
        initialValues: formEditTopic,
        validationSchema: formEditTopicSchema,
        handleChange: { handleInput },
        handleSubmit: { handleSubmitEditTopic }
    })

    const { values, errors } = formik
    console.log("Values:", Object.values(values))

    return (
        <form
            className={clsx('h-full w-full p-0 items-center justify-center dark:bg-black', props.className)}
        >
            <h1 className='text-md font-bold font-merriweather text-center dark:text-white'>
                Edit topic user
            </h1>

            <div className='grid grid-cols-2 gap-2'>
                <Input
                    name='name'
                    label={formLabel.name}
                    variant='underlined'
                    onChange={formik.handleChange}
                    type='text'
                    defaultValue={values.name}
                    className='py-[10px] px-[15px] text-sm my-[8px] mx-0 rounded-sm w-full'
                />

                <Input
                    name='description'
                    label={formLabel.description}
                    variant='underlined'
                    onChange={formik.handleChange}
                    type='text'
                    defaultValue={values.description}
                    className='py-[10px] px-[15px] text-sm my-[8px] mx-0 rounded-sm w-full'
                />
                <Input
                    name='beginAt'
                    variant='underlined'
                    label={formLabel.beginAt}
                    type='text'
                    isReadOnly
                    defaultValue={[hourTimeFormat(new Date(beginAt)), dateTimeFormat(new Date(beginAt))].join(" - ")}
                    className='py-[10px] px-[15px] text-sm my-[8px] mx-0 rounded-sm w-full'
                />
                <Input
                    name='endAt'
                    variant='underlined'
                    label={formLabel.endAt}
                    isReadOnly
                    type='text'
                    defaultValue={[hourTimeFormat(new Date(endAt)), dateTimeFormat(new Date(endAt))].join(" - ")}
                    className='py-[10px] px-[15px] text-sm my-[8px] mx-0 rounded-sm w-full'
                />
                <Input
                    name='createdAt'
                    variant='underlined'
                    label={formLabel.createdAt}
                    isReadOnly
                    type='text'
                    defaultValue={[hourTimeFormat(new Date(createdAt)), dateTimeFormat(new Date(createdAt))].join(" - ")}
                    className='py-[10px] px-[15px] text-sm my-[8px] mx-0 rounded-sm w-full'
                />
                <Input
                    name='updatedAt'
                    variant='underlined'
                    label={formLabel.updatedAt}
                    type='text'
                    isReadOnly
                    defaultValue={[hourTimeFormat(new Date(updatedAt)), dateTimeFormat(new Date(updatedAt))].join(" - ")}
                    className='py-[10px] px-[15px] text-sm my-[8px] mx-0 zrounded-sm w-full'
                />
            </div>
            <div className='flex justify-end pr-4 w-full'>
                <Button
                    className=" text-sm font-merriweather"
                    variant="bordered"
                    type='submit'
                    onClick={handleSubmitEditTopic}
                >
                    Change
                </Button>
            </div>

        </form>
    )
}

export default FormEditTopic
