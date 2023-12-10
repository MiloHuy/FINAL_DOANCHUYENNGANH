import { Modal, ModalBody, ModalContent } from "@nextui-org/react";
import ListSinhVien from "features/list-sinhvien";

const ModalListSinhVien = ({ isOpen, onOpenChange }) => {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            radius="4xl"
            size='md'
            backdrop='blur'
            classNames={{
                body: "py-6",
                closeButton: "hover:bg-white/5 active:bg-white/10",
                base: "border-[#292f46] bg-[#AAAAAA] dark:bg-[#19172c] text-black"
            }}

            motionProps={{
                variants: {
                    enter: {
                        y: 0,
                        opacity: 1,
                        transition: {
                            duration: 0.5,
                            ease: "easeOut",
                        },
                    },
                    exit: {
                        y: -20,
                        opacity: 0,
                        transition: {
                            duration: 0.4,
                            ease: "easeIn",
                        },
                    },
                }
            }}
        >
            <ModalContent>
                {() => (
                    <>
                        <ModalBody>
                            <ListSinhVien />
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default ModalListSinhVien
