import clsx from 'clsx';
import DataTablePagination from 'components/data-table-pagination';
import DataTableUser from 'components/data-table-user';
import SearchBlockDebounce from 'components/search-block-debounce';
import { useCallback, useEffect, useState } from 'react';
import { getListUser } from 'services/guest.svc';
import columns from './columns';

const ListInfoUser = (props) => {
    const [data, setData] = useState()

    const [filter, setFilter] = useState({
        page: 1,
        size: 4,
        search: '',
    })

    const [pagination, setPagination] = useState({
        pagIndex: 1,
        size: 2,
        totals: 2
    })

    const fetchTopics = useCallback(async (page, pageSize, search) => {
        try {
            const initialData = await getListUser(
                {
                    page: page,
                    size: pageSize,
                    search: search
                }
            )
            setData(initialData)

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

    useEffect(() => {
        fetchTopics(
            filter.page,
            filter.size,
            filter.search
        )
    }, [fetchTopics, filter.page, filter.size, filter.search])

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
        <div className={clsx('flex items-center justify-center flex-col gap-3', props.className)}>
            <h1 className='text-sm text-black dark:text-white font-bold font-merriweather text-center'>
                DANH SÁCH GIẢNG VIÊN
            </h1>

            <div className='w-full flex items-start'>
                <SearchBlockDebounce
                    className='flex items-start w-1/3'
                    onSubmit={handleSearch} />
            </div>

            <DataTableUser
                columns={columns}
                data={data?.data.users}
            />

            <DataTablePagination
                pagination={pagination}
                onPageChange={handlePageChange} />
        </div>
    )
}

export default ListInfoUser
