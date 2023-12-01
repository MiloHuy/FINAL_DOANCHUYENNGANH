import { Input } from '@nextui-org/react'
import clsx from "clsx"
import { dateTimeFormat, hourTimeFormat } from 'utils/format-date.utils'

const FormViewTopic = (props) => {
    const { topicsInfo } = props
    const { name, description, beginAt, endAt, createdAt, updatedAt } = topicsInfo

    return (
        <form
            className={clsx('h-full w-full p-0 items-center justify-center dark:bg-black', props.className)}
        >
            <h1 className='text-md font-bold font-merriweather text-center dark:text-white'>Detail topic user</h1>

            <div className='grid grid-cols-2 gap-2'>
                <Input
                    name='name'
                    label="NAME"
                    isReadOnly
                    variant='underlined'
                    type='text'
                    value={name}
                    className='py-[10px] px-[15px] text-sm my-[8px] mx-0 rounded-sm w-full'
                />

                <Input
                    name='description'
                    isReadOnly
                    label="DESCRIPTION"
                    variant='underlined'
                    type='text'
                    value={description}
                    className='py-[10px] px-[15px] text-sm my-[8px] mx-0 rounded-sm w-full'
                />
                <Input
                    name='beginAt'
                    isReadOnly
                    variant='underlined'
                    label="BEGIN AT"
                    type='text'
                    value={[hourTimeFormat(new Date(beginAt)), dateTimeFormat(new Date(beginAt))].join(" - ")}
                    className='py-[10px] px-[15px] text-sm my-[8px] mx-0 rounded-sm w-full'
                />
                <Input
                    name='endAt'
                    isReadOnly
                    variant='underlined'
                    label="END AT"
                    type='text'
                    value={[hourTimeFormat(new Date(endAt)), dateTimeFormat(new Date(endAt))].join(" - ")}
                    className='py-[10px] px-[15px] text-sm my-[8px] mx-0 rounded-sm w-full'
                />
                <Input
                    name='createdAt'
                    isReadOnly
                    variant='underlined'
                    label="CREATE AT"
                    type='text'
                    value={[hourTimeFormat(new Date(createdAt)), dateTimeFormat(new Date(createdAt))].join(" - ")}
                    className='py-[10px] px-[15px] text-sm my-[8px] mx-0 rounded-sm w-full'
                />
                <Input
                    name='updatedAt'
                    isReadOnly
                    variant='underlined'
                    label="UPDATE AT"
                    type='text'
                    value={[hourTimeFormat(new Date(updatedAt)), dateTimeFormat(new Date(updatedAt))].join(" - ")}
                    className='py-[10px] px-[15px] text-sm my-[8px] mx-0 rounded-sm w-full'
                />
            </div>


        </form>
    )
}

export default FormViewTopic
