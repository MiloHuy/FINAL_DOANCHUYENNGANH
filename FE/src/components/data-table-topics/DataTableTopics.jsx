import { Button, Modal, ModalBody, ModalContent, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@nextui-org/react";
import FormEditTopic from "features/form-edit-topic";
import FormViewTopic from "features/form-view-topic";
import { Eye, PenSquare, Trash2 } from 'lucide-react';
import { useCallback, useState } from "react";
import { dateTimeFormat, hourTimeFormat } from "utils/format-date.utils";

const DataTableTopics = ({ columns, data, onDelete, onEdit, isLoading }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [optionAction, setOptionAction] = useState()

    const [topicsInfo, setTopicsInfo] = useState({
        _id: '',
        name: '',
        description: '',
        beginAt: '',
        endAt: '',
        createdAt: '',
        updatedAt: '',
    })

    const handleOnDelete = (id) => {
        if (!onDelete) return
        onDelete(id)
    }

    const handleEditTopics = (
        id,
        name,
        description,
        beginAt,
        endAt,
        createdAt,
        updatedAt) => {

        setOptionAction('edit')
        onOpen()
        setTopicsInfo({
            ...topicsInfo,
            _id: id,
            name: name,
            description: description,
            beginAt: beginAt,
            endAt: endAt,
            createdAt: createdAt,
            updatedAt: updatedAt,
        })
    }

    const handleViewTopic = (
        id,
        name,
        description,
        beginAt,
        endAt,
        createdAt,
        updatedAt) => {

        setOptionAction('view')
        onOpen()
        setTopicsInfo({
            ...topicsInfo,
            _id: id,
            name: name,
            description: description,
            beginAt: beginAt,
            endAt: endAt,
            createdAt: createdAt,
            updatedAt: updatedAt,
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
            case "description":
                return (
                    <h1 className='text-sm text-black dark:text-white '>
                        {user.description}
                    </h1>
                );
            case "beginAt":
                return (
                    <h1 className='text-sm text-black dark:text-white '>
                        {[hourTimeFormat(new Date(user.beginAt)), dateTimeFormat(new Date(user.beginAt))].join(" - ")}
                    </h1>
                );
            case "endAt":
                return (
                    <h1 className='text-sm text-black dark:text-white '>
                        {[hourTimeFormat(new Date(user.endAt)), dateTimeFormat(new Date(user.endAt))].join(" - ")}
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
                    <div className="relative flex items-center gap-1">
                        <Button className=' dark:bg-white' isIconOnly variant="light" onClick={() => handleViewTopic(
                            user._id,
                            user.name,
                            user.description,
                            user.beginAt,
                            user.endAt,
                            user.createdAt,
                            user.updatedAt,
                        )}>
                            <Eye size={20} color="#0a0a0a" />
                        </Button>

                        <Button className=' dark:bg-white' isIconOnly variant="light" onClick={() => handleEditTopics(
                            user._id,
                            user.name,
                            user.description,
                            user.beginAt,
                            user.endAt,
                            user.createdAt,
                            user.updatedAt,
                        )}>
                            <PenSquare size={20} color="#0a0a0a" />
                        </Button>

                        <Button className=' dark:bg-white' isIconOnly variant="light" onClick={() => handleOnDelete(user._id)} >
                            <Trash2 size={20} color="#be2d2d" />
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
                isStriped
                layout="fixed"
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
                    base: "dark:bg-white dark:text-white",
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                {
                                    optionAction === 'view' ? <FormViewTopic topicsInfo={topicsInfo} /> : <FormEditTopic topicsInfo={topicsInfo} handleEdit={onEdit} />
                                }
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>

    )
}

export default DataTableTopics
