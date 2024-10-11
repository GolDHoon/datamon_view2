'use client'
import 'react-data-grid/lib/styles.css';
import DataGrid, { SortDirection, SortColumn } from 'react-data-grid';
import { useState } from 'react';

//컬럼 별 오름차순, 내림차순 정렬할 때 쓰일 화살표 아이콘 
import { BiSolidUpArrowAlt, BiSolidDownArrowAlt  } from "react-icons/bi";

const columns = [
    { key: 'id', name: 'ID', sortable: true },
    { key: 'title', name: 'Title', sortable: true }
];

const initialRows = [
    { id: 0, title: 'Example' },
    { id: 1, title: 'Demo' },

];

export default function CommonDataGrid() {
    const [rows, setRows] = useState(initialRows);
    const [sortColumns, setSortColumns] = useState<SortColumn[]>([]);

    // function handleSortColumnsChange(newSortColumns: SortColumn[]) {
    //     setSortColumns(newSortColumns);
    //     const sortedRows = [...rows];
    //     sortedRows.sort((a, b) => {
    //         for (const sort of newSortColumns) {
    //             const comparator = sort.direction === SortDirection.ASC ? 1 : -1;
    //             if (a[sort.columnKey] > b[sort.columnKey]) return comparator;
    //             if (a[sort.columnKey] < b[sort.columnKey]) return -comparator;
    //         }
    //         return 0;
    //     });
    //     setRows(sortedRows);
    // }

    return (
        <DataGrid
            columns={columns}
            rows={rows}
            // sortColumns={sortColumns}
            // onSortColumnsChange={handleSortColumnsChange}
        />
    );
}