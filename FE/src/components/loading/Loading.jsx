
const Loading = () => {
    const dots = 6

    return (
        <div className='w-full h-full'>
            <div className='absolute rounded-md flex justify-center items-center left-0 top-0 w-full h-full'>
                {
                    Array.from({ length: dots }).map((_, dotIndex) => {
                        return (
                            <div
                                key={dotIndex}
                                className={`animate-loading absolute ease-in-out h-[20px] w-[20px] rounded-full bg-black bg-opacity-80 z-50 `}
                                style={{ animationDelay: `${(dots - dotIndex) * 100}ms` }}
                            >
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Loading
