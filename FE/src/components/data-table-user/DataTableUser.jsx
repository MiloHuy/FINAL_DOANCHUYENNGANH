import { Button, Modal, ModalBody, ModalContent, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@nextui-org/react";
import ListTopicsUserDetails from "features/list-topics-user-details";
import { Eye } from 'lucide-react';
import { useCallback, useState } from "react";

const DataTableUser = ({ columns, data, onEdit, isLoading }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [userInfo, setUserInfo] = useState({
        _id: '',
        name: '',
    })

    const handleViewTopic = (
        id,
        name
    ) => {

        onOpen()
        setUserInfo({
            ...userInfo,
            _id: id,
            name: name
        })
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
            case "phone":
                return (
                    <h1 className='text-sm text-black dark:text-white '>
                        {user.phone}
                    </h1>
                );
            case "email":
                return (
                    <h1 className='text-sm text-black dark:text-white '>
                        {user.email}
                    </h1>
                );
            case "degree":
                return (
                    <h1 className='text-sm text-black dark:text-white '>
                        {user.degree}
                    </h1>
                );
            case "action":
                return (
                    <div className="relative flex items-center">
                        <Button className=' dark:bg-white' isIconOnly variant="light" onClick={() => handleViewTopic(
                            user._id,
                            user.name
                        )}>
                            <Eye size={20} color="#0a0a0a" />
                        </Button>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <div className='w-full p-4'>
            <Table
                selectionMode="single"
            >
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
                            loadingContent={<Spinner label="Loading..." />}
                        >
                            {(item) => (
                                <TableRow key={item.name}>
                                    {(columnKey) => <TableCell>{renderCell(item, columnKey, item._id)}</TableCell>}
                                </TableRow >
                            )}
                        </TableBody > : <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
                }
            </Table >

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                radius="2xl"
                placement="top-center"
                backdrop='blur'
                size='5xl'
                classNames={{
                    body: "py-6",
                    base: "border-[#ffffff] bg-[#929292] dark:bg-black text-[#a8b0d3]",
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <ListTopicsUserDetails userInfo={userInfo} />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>

    )
}

export default DataTableUser
