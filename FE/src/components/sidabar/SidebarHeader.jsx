import { clsx } from "clsx"

const SidebarHeader = (props) => {

    return (
        <div className={clsx(' flex items-center justify-center p-4 ', props.className)}>
            <h1 className='text-lg text-black dark:text-white font-bold font-merriweather text-center'>ĐÂY LÀ TRANG QUẢN LÝ ĐỀ TÀI KHOA</h1>
        </div>
    )
}

export default SidebarHeader
