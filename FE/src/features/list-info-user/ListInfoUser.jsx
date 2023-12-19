import { Select, SelectItem, Spinner } from "@nextui-org/react";
import clsx from 'clsx';
import DataTablePagination from 'components/data-table-pagination';
import DataTableUser from 'components/data-table-user';
import SearchBlockDebounce from 'components/search-block-debounce';
import { useCallback, useEffect, useState } from 'react';
import { getListUser } from 'services/guest.svc';
import columns from './columns';

const ListInfoUser = (props) => {
    const [data, setData] = useState()
    const [valueSort, setValueSort] = useState('');
    const [typeSort, setTypeSort] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    const [filter, setFilter] = useState({
        page: 1,
        size: 4,
        search: '',
        sort: '',
    })

    const [pagination, setPagination] = useState({
        pagIndex: 1,
        size: 2,
        totals: 2
    })

    const fetchTopics = useCallback(async (page, pageSize, search, sort) => {
        try {
            setIsLoading(true)
            const initialData = await getListUser(
                {
                    page: page,
                    size: pageSize,
                    search: search,
                    sort: sort
                }
            )
            setData(initialData)

            setIsLoading(false)

            const { size, totals } = initialData.data
            setPagination((prev) => ({
                ...prev,
                size: size,
                totals: totals
            }))
        }
        catch (err) {
            console.log(err)
        }

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
            filter.search,
            filter.sort,
        )
        // handleSort()
    }, [fetchTopics, filter.page, filter.size, filter.search, filter.sort])

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

    return (
        <div className={clsx('grid items-center justify-center grid-cols-1 gap-5', props.className)}>
            <h3 className='text-sm text-black dark:text-white font-bold font-merriweather text-center'>
                DANH SÁCH GIẢNG VIÊN
            </h3>

            <div className='grid grid-cols-1 py-2 border bg-table_background rounded-md border-black'>
                <div className='w-full flex items-end justify-between px-3 gap-3'>
                    <SearchBlockDebounce
                        variant='faded'
                        className='flex items-start w-1/3'
                        onSubmit={handleSearch} />

                    <Select
                        size='sm'
                        variant='faded'
                        label="Select sort"
                        className="w-1/4 "
                        selectedKeys={[valueSort]}
                        onChange={handleSelectionChange}
                    >
                        <SelectItem key='name' className="text-black">
                            Name
                        </SelectItem>

                    </Select>

                    <Select
                        size='sm'
                        variant='faded'
                        label="Select type sort"
                        className="w-1/4"
                        selectedKeys={[typeSort]}
                        onChange={handleSelectionTypeSort}
                    >
                        <SelectItem key='asc'>
                            Asc
                        </SelectItem>

                        <SelectItem key='desc'>
                            Desc
                        </SelectItem>
                    </Select>
                </div>

                {
                    data && data.data ?
                        <DataTableUser
                            isLoading={isLoading}
                            columns={columns}
                            data={data.data.users}
                        />
                        : <Spinner
                            size="lg"
                            label="Loading"
                            color="primary"
                        />
                }

                <div className='w-full flex justify-center'>
                    <DataTablePagination
                        pagination={pagination}
                        onPageChange={handlePageChange} />
                </div>
            </div>
        </div>
    )
}

export default ListInfoUser
