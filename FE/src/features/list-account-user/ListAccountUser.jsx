import { Select, SelectItem, Spinner } from "@nextui-org/react";
import clsx from 'clsx';
import DataTable from 'components/data-table';
import DataTablePagination from 'components/data-table-pagination';
import SearchBlockDebounce from 'components/search-block-debounce';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteAccounts, getAllAccounts } from 'services/admin.svc';
import columns from './columns';

const ListAccountUser = (props) => {
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
        search: '',
        sort: '',
    })

    const fetchAccounts = useCallback(async (page, pageSize, search, sort) => {
        try {
            const initialData = await getAllAccounts({
                page: page,
                size: pageSize,
                search: search,
                sort: sort
            })
            setData(initialData)

            setIsLoading(!isLoading)

            const { size, totals } = initialData.data
            setPagination((prev) => (({
                ...prev,
                size: size,
                totals: totals
            })))

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
        fetchAccounts(
            filter.page,
            filter.size,
            filter.search,
            filter.sort,
        )

    }, [fetchAccounts, filter.page, filter.size, filter.search, filter.sort])

    const handleSearch = useCallback((newFilter) => {
        setFilter((prev) => ({
            ...prev,
            page: 1,
            search: newFilter.searchTerm
        }))

        setPagination((prev) => ({
            ...prev,
            pagIndex: 1
        }))
    }, [])

    const handleDeleteAccount = async (id) => {
        try {
            const account = await deleteAccounts(id)

            setData(account)
            setFilter((prev) => ({
                ...prev,
                page: 1
            }))

            toast.success('Xóa account thành công!!!', {
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

            toast.success('Xóa account thất bại!!!', {
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
    }

    return (
        <div className={clsx('flex items-center justify-center flex-col gap-3', props.className)}>
            <h1 className='text-sm text-black dark:text-white font-bold font-merriweather text-center'>
                DANH SÁCH TÀI KHOẢN CỦA NGƯỜI DÙNG.
            </h1>

            <div className='w-full flex items-start justify-between px-4'>
                <SearchBlockDebounce
                    className='flex items-start w-1/3'
                    onSubmit={handleSearch} />
                <Select
                    size='sm'
                    variant='bordered'
                    radius='sm'
                    label="Select sort"
                    className="w-1/4"
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
                    <DataTable
                        isLoading={isLoading}
                        columns={columns}
                        data={data.data.users}
                        onDelete={handleDeleteAccount}
                    /> :
                    <Spinner
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

export default ListAccountUser
