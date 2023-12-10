import FormLogin from "features/form-login"

const Authen = () => {

    return (
        <div className='flex justify-center items-center w-screen h-screen bg-bg_login bg-cover px-2'>
            <div className="relative flex justify-center h-4/5 w-1/2 rounded-lg border-2 bg-transparent backdrop-blur-sm opacity-100 drop-shadow-md z-20">
                <FormLogin />
            </div>
        </div>
    )
}

export default Authen
