
const Loading = () => {
    const dots = 6
    return (
        <div className='rounded-md flex justify-center items-center left-0 top-0 w-full h-full'>
            {
                Array.from({ length: dots }).map((_, dotIndex) => {
                    return (
                        <div className='grid grid-rows-2 gap-2'>
                            <div
                                key={dotIndex}
                                className={`relative indent-999 ease-in-out h-[20px] w-[20px] rounded-full border-2 border-solid bg-black border-black animate-mulShdSpin translate-z-0`}
                                style={{ animationDelay: `${(dots - dotIndex) * 100}ms` }}
                            >
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Loading
