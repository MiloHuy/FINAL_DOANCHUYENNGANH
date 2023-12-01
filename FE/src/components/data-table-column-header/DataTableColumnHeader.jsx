import clsx from 'clsx'
import React from 'react'

const DataTableColumnHeader = ({ column, title }) => {
    return (
        <div className={clsx()}>
            {title}
        </div>
    )
}

export default DataTableColumnHeader