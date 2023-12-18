
import { Select, SelectItem, Spinner } from "@nextui-org/react";
import clsx from 'clsx';
import DataTablePagination from 'components/data-table-pagination';
import DataTableTopics from 'components/data-table-topics/DataTableTopics';
import SearchBlockDebounce from 'components/search-block-debounce';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteTopicUser, getListTopicUser } from 'services/user.svc';
import columns from './columns';

const ListTopicsUser = (props) => {
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [valueSort, setValueSort] = useState('');
    const [typeSort, setTypeSort] = useState('');

    const [pagination, setPagination] = useState({
        pagIndex: 1,
        size: 2,
        totals: 2
    })

    const [filter, setFilter] = useState({
        page: 1,
        size: 4,
        value: '',
        sort: '',
    })

    const fetchTopics = useCallback(async (page, pageSize, search, sort) => {
        try {
            const initialData = await getListTopicUser(
                {
                    page: page,
                    size: pageSize,
                    value: search,
                    sort: sort
                })
            setData(initialData)

            setIsLoading(!isLoading)

            const { size, totals } = initialData.data
            setPagination((prev) => ({
                ...prev,
                size: size,
                totals: totals
            }))
        } catch (error) {
            console.log(error)
        }

    }, [])

    const handlePageChange = useCallback((newPage) => {
        setFilter((prev) => ({
            ...prev,
            page: newPage
        }))

        setPagination((prev) => ({
            ...prev,
            pagIndex: newPage
        }))
    }, [])

    const handleSelectionChange = (e) => {
        setValueSort(e.target.value);
    };

    const handleSelectionTypeSort = (e) => {
        setTypeSort(e.target.value);
    };

    const handleSort = useCallback(() => {
        setFilter((prev) => ({
            ...prev,
            page: 1,
            sort: [valueSort, typeSort].join(',')
        }))

        setPagination((prev) => ({
            ...prev,
            pagIndex: 1
        }))
    }, [valueSort, typeSort])

    useEffect(() => {
        handleSort()
    }, [handleSort])

    useEffect(() => {
        fetchTopics(
            filter.page,
            filter.size,
            filter.value,
            filter.sort
        )

    }, [fetchTopics, filter.page, filter.size, filter.value, filter.sort])

    const handleSearch = useCallback((newFilter) => {
        setFilter((prev) => ({
            ...prev,
            page: 1,
            value: newFilter.searchTerm
        }))

        setPagination((prev) => ({
            ...prev,
            pagIndex: 1
        }))
    }, [])

    const handleDeleteTopics = async (id) => {
        try {
            const account = await deleteTopicUser(id)

            setData(account)
            setFilter((prev) => ({
                ...prev,
                page: 1
            }))

            toast.success('Xóa topics thành công!!!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleEditTopics = (flag) => {
        if (flag === 0) return

        fetchTopics(
            filter.page,
            filter.size,
            filter.value)
    }

    return (
        <div className={clsx('flex items-center justify-center flex-col gap-3', props.className)}>
            <h1 className='text-sm text-black dark:text-white font-bold font-merriweather text-center'>
                DANH SÁCH ĐỀ TÀI
            </h1>

            <div className='w-full flex items-center justify-between px-5'>
                <SearchBlockDebounce
                    className='flex items-start w-1/3'
                    onSubmit={handleSearch} />

                <Select
                    size='sm'
                    variant='bordered'
                    label="Select sort"
                    className="w-1/4 "
                    selectedKeys={[valueSort]}
                    onChange={handleSelectionChange}
                >
                    <SelectItem key='name'>
                        Name
                    </SelectItem>

                    <SelectItem key='degree'>
                        Degree
                    </SelectItem>
                </Select>

                <Select
                    size='sm'
                    variant='bordered'
                    label="Select type sort"
                    className="w-1/4"
                    selectedKeys={[typeSort]}
                    onChange={handleSelectionTypeSort}
                >
                    <SelectItem key='asc'>
                        Asc
                    </SelectItem>

                    <SelectItem key='desc'>
                        Dec
                    </SelectItem>
                </Select>
            </div>

            {
                data ?
                    <DataTableTopics
                        isLoading={isLoading}
                        columns={columns}
                        data={data.data.topics}
                        onDelete={handleDeleteTopics}
                        onEdit={handleEditTopics}
                    />
                    : <Spinner
                        size="lg"
                        label="Loading"
                        color="default"
                    />
            }



            <DataTablePagination
                pagination={pagination}
                onPageChange={handlePageChange} />
        </div>
    )
}

export default ListTopicsUser
