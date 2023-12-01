
import clsx from 'clsx';
import DataTablePagination from 'components/data-table-pagination';
import DataTableTopics from 'components/data-table-topics/DataTableTopics';
import { useCallback, useEffect, useState } from 'react';
import { getUserTopics } from 'services/guest.svc';
import columns from './columns';

const ListTopicsUserDetails = (props) => {
    const { userInfo } = props
    const { _id, name } = userInfo
    const [isLoading, setIsLoading] = useState(true)

    const [data, setData] = useState()

    const [pagination, setPagination] = useState({
        pagIndex: 1,
        size: 2,
        totals: 2
    })

    const [filter, setFilter] = useState({
        page: 1,
        size: 4,
    })

    const fetchTopics = useCallback(async (page, pageSize) => {
        try {
            const initialData = await getUserTopics(_id,
                {
                    page: page,
                    size: pageSize,
                })
            setData(initialData)

            setIsLoading(!isLoading)

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

    useEffect(() => {
        fetchTopics(
            filter.page,
            filter.size,
        )

    }, [fetchTopics, filter.page, filter.size, _id])

    return (
        <div className={clsx('flex items-center justify-center flex-col gap-3', props.className)}>
            <h1 className='text-sm text-black dark:text-white font-bold font-merriweather text-center'>
                {`DANH SÁCH ĐỀ TÀI CỦA GIẢNG VIÊN ${name}`}
            </h1>

            <DataTableTopics
                isLoading={isLoading}
                columns={columns}
                data={data?.data.topics}
            />

            <DataTablePagination
                pagination={pagination}
                onPageChange={handlePageChange} />
        </div>
    )
}

export default ListTopicsUserDetails
