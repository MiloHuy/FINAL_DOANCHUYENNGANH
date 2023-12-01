import { FileImage, Trash2, UploadCloud } from 'lucide-react'
import { useState } from 'react'

const FieldUpload = () => {
    const [imageName, setImageName] = useState('No file Selected')

    return (
        <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
            <form
                action=""
                className=' flex flex-col justify-center items-center border-2 border-dashed border-blue-400 h-80 w-[500px] rounded-md cursor-pointer'
                onClick={() => { document.getElementById('input-element').click() }}>

                <p className='text-gray-600/50 text-lg font-bold'>Browse file to upload</p>

                <UploadCloud size={50} color='#60A5FA' className='my-5' />

                <p className='text-gray-600 text-lg font-bold'>Supported Files</p>
                <p className='text-gray-600 text-md'>JPG, JPEG, PNG</p>

                <input
                    type="file"
                    accept='image/*'
                    id='input-element'
                    className='hidden'
                    onChange={({ target: { files } }) => {
                        files[0] && setImageName(files[0].name)
                    }} />

            </form>

            <div
                className='flex flex-row w-[500px] justify-between items-center my-3 py-4 px-5 rounded-md bg-slate-400/30 '>
                <FileImage
                    size={30}
                    color='#60A5FA' >
                </FileImage>

                <span className=''>
                    <h1 className='inline-block mr-3'>{imageName}</h1>

                    <Trash2
                        color='#FF7070' className='inline-block cursor-pointer'
                        onClick={() => setImageName('No file Selected')}>
                    </Trash2>
                </span>
            </div>
        </div>

    )
}
export default FieldUpload