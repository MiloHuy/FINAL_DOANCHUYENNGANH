import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { useMemo } from "react";

const ListSinhVien = () => {
    const classNames = useMemo(
        () => ({
            th: ['bg-table_header_background text-white border-divider '],
            base: ['max-w-full'],
            tb: ['border-b'],
            wrapper: ['max-w-[400px]']
        }),
        [],
    );

    return (
        <div className='w-full py-4 grid grid-cols-1 gap-2'>
            <h1 className='text-lg font-bold font-merriweather  dark:text-white w-90 text-center'>
                Danh sách sinh viên tham gia
            </h1>

            <Table
                classNames={classNames}
            >
                <TableHeader>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>MSSV</TableColumn>
                    <TableColumn>RATE</TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow key="1">
                        <TableCell>Trần Nhật Hào</TableCell>
                        <TableCell>20110471</TableCell>
                        <TableCell>100%</TableCell>
                    </TableRow>
                    <TableRow key="2">
                        <TableCell>Trần Thanh Phương</TableCell>
                        <TableCell>20110547</TableCell>
                        <TableCell>100%</TableCell>
                    </TableRow>
                    <TableRow key="3">
                        <TableCell>Nguyễn Đình Quang Huy</TableCell>
                        <TableCell>20110494</TableCell>
                        <TableCell>100%</TableCell>
                    </TableRow>

                </TableBody>
            </Table>
        </div>

    )
}

export default ListSinhVien
