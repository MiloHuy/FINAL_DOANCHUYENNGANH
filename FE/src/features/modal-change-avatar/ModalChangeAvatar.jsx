import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import FormUploadImage from 'features/form-upload-image/FormUploadImage';

const ModalChangeAvatar = ({ isOpen, onOpenChange, onClose, handleChangeAvatar }) => {
    return (
        <Modal
            scrollBehavior='outside'
            isOpen={isOpen}
            onClose={onClose}
            onOpenChange={onOpenChange}
            radius="3xl"
            size='lg'
            backdrop='blur'
            classNames={{
                base: "border-[#ffffff] bg-[#0C0C0C] dark:bg-black text-[#a8b0d3] h-[520px]",
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader
                            className="flex gap-1 justify-center text-white font-mono">
                            Thay đổi ảnh đại diện
                        </ModalHeader>

                        <ModalBody>
                            <FormUploadImage handleChangeAvatar={handleChangeAvatar} />
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default ModalChangeAvatar
