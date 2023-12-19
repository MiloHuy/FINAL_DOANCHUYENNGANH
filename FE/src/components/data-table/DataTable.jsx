import { Button, Modal, ModalBody, ModalContent, Popover, PopoverContent, PopoverTrigger, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@nextui-org/react";
import FormSetPassword from "features/form-set-password";
import { PenSquare, Trash2 } from 'lucide-react';
import { useCallback, useState } from "react";
import { dateTimeFormat, hourTimeFormat } from "utils/format-date.utils";

const DataTable = ({ columns, data, isLoading, onDelete }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [usernameInfo, setUserInfo] = useState({
        username: '',
        _id: ''
    })
    const [isLoad, setIsLoad] = useState(false)

    const handleOnDelete = (id) => {
        if (!onDelete) return
        setIsLoad(true)
        onDelete(id)
        setIsLoad(false)
    }

    const handleEditPassWord = (username, id) => {
        try {
            if (!onDelete) return
            onOpen()
            setUserInfo({
                ...username,
                username: username,
                _id: id
            })
        } catch (error) {

        }
    }

    const renderCell = useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "name":
                return (
                    <h1 className='text-sm text-black dark:text-white '>
                        {user.name}
                    </h1>
                );
            case "username":
                return (
                    <h1 className='text-sm text-black dark:text-white '>
                        {user.username}
                    </h1>
                );
            case "role":
                return (
                    <h1 className='text-sm text-black dark:text-white '>
                        {user.role}
                    </h1>
                );
            case "createdAt":
                return (
                    <h1 className='text-sm text-black dark:text-white '>
                        {[hourTimeFormat(new Date(user.createdAt)), dateTimeFormat(new Date(user.createdAt))].join(" - ")}
                    </h1>
                );
            case "updatedAt":
                return (
                    <h1 className='text-sm text-black dark:text-white '>
                        {[hourTimeFormat(new Date(user.updatedAt)), dateTimeFormat(new Date(user.updatedAt))].join(" - ")}
                    </h1>
                );
            case "action":
                return (
                    <div className="relative flex items-center gap-2">
                        <Button className=' dark:bg-white' isIconOnly variant="light" onClick={() => handleEditPassWord(user.name, user._id)}>
                            <PenSquare size={16} color="#0a0a0a" />
                        </Button>

                        <Popover placement="bottom">
                            <PopoverTrigger>
                                <Button className=' dark:bg-white' isIconOnly variant="light" >
                                    <Trash2 size={16} color="#be2d2d" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[140px] ">
                                <div classNamee='grid grid-cols-1 gap-2 w-full'>
                                    <Button
                                        isLoading={isLoad}
                                        className=' dark:bg-white'
                                        variant="light"
                                        onClick={() => handleOnDelete(user._id)}>
                                        Xác nhận
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#be2d2d" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round-x"><path d="M2 21a8 8 0 0 1 11.873-7" /><circle cx="10" cy="8" r="5" /><path d="m17 17 5 5" /><path d="m22 17-5 5" /></svg>
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <div
            className='w-full p-4 '>
            <Table
                radius='sm'
                layout="fixed">
                <TableHeader columns={columns} >
                    {(column) => <TableColumn
                        key={column.key}
                        allowsSorting={column.allowsSorting}
                        align='center'>
                        {column.label}
                    </TableColumn>}
                </TableHeader>
                {
                    data && data.length !== 0 ?
                        <TableBody
                            isLoading={isLoading}
                            items={data}
                            loadingContent={<Spinner label="Loading..." color='primary' />}
                        >
                            {(item) => (
                                <TableRow key={item.username}>
                                    {(columnKey) => <TableCell>{renderCell(item, columnKey, item._id)}</TableCell>}
                                </TableRow >
                            )}
                        </TableBody >
                        :
                        <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
                }

            </Table >

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                classNames={{
                    body: "py-6",
                    base: "border-[#292f46] bg-[#202120] dark:bg-[#525451] text-[#a8b0d3]",
                    closeButton: "hover:bg-white/5 active:bg-white/10",
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <FormSetPassword usernameInfo={usernameInfo} />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>

    )
}

export default DataTable
