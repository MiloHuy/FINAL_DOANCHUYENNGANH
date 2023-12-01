import FormLogin from "features/form-login"

const Authen = () => {

    return (
        <div className='flex justify-center items-center w-screen h-screen bg-bg_hcmute bg-cover '>
            <div className="relative flex justify-center h-4/5 w-2/3 rounded-[30px] border bg-transparent backdrop-blur-sm opacity-100 drop-shadow-md z-20">
                <FormLogin />
            </div>
        </div>
    )
}

export default Authen
