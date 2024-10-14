import React, { useState, useRef, useEffect, useCallback } from 'react'; // React와 필요한 hook들 import
import { NextPage } from "next"; // Next.js의 NextPage 타입 import
import { useDrag, useDrop, DndProvider } from 'react-dnd'; // react-dnd를 위한 hook들 import
import { HTML5Backend } from 'react-dnd-html5-backend'; // HTML5Backend를 사용하는 react-dnd 프론트엔드 백엔드 import
import { MdArrowDropUp, MdArrowDropDown, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight, MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const ItemType = 'COLUMN'; // 드래그 앤 드롭에서 사용할 Item Type 정의

// DataGridProps 인터페이스 정의. columns와 rows 프로퍼티를 포함
interface DataGridProps {
    columns?: { columnType: string; name: string; filterType: string; key: string }[];
    rows?: any[];
}

// ColumnProps 인터페이스 정의. Column 컴포넌트에서 사용할 여러 프로퍼티들을 포함
interface ColumnProps {
    column: { columnType: string; name: string; filterType: string; key: string };
    index: number;
    moveColumn: (dragIndex: number, hoverIndex: number) => void;
    columnWidths: number[];
    onMouseDown: (index: number, e: React.MouseEvent<HTMLDivElement>) => void;
    onSort: (columnKey: string) => void;
    sortOrder: 'asc' | 'desc' | null;
}

// Column 컴포넌트 정의
const Column: React.FC<ColumnProps> = ({ column, index, moveColumn, columnWidths, onMouseDown, onSort, sortOrder }) => {
    const ref = useRef<HTMLDivElement>(null); // 드래그 앤 드롭을 위한 ref 생성

    const [, drop] = useDrop({
        accept: ItemType, // 드롭할 수 있는 Item Type 설정
        hover(item: any) {
            if (!ref.current) {
                return; // ref가 유효하지 않을 경우 반환
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return; // 드래그와 호버 위치가 동일할 경우 반환
            }

            moveColumn(dragIndex, hoverIndex); // 컬럼 위치 변경
            item.index = hoverIndex; // 드래그 중인 아이템의 인덱스 업데이트
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: ItemType, // 드래그할 수 있는 Item Type 설정
        item: { type: ItemType, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(), // 드래그 상태 수집
        }),
    });



    // const [TableHeadWidths, setTableHeadWidths] = useState([]); // 너비를 저장할 상태

    // useEffect(() => {
    //     const calculateWidths = () => {
    //         const rows = document.querySelectorAll('.row'); // .row 요소 선택
    //         const widths = []; // 너비를 저장할 배열
            
    //         for (const row of rows) {
    //             const cells = row.querySelectorAll('.cell'); // 각 .row 안의 .cell 선택
    //             for (const cell of cells) {
    //                 widths.push(cell.offsetWidth); // 각 .cell의 너비를 배열에 추가
    //             }
    //         }
    
    //         setTableHeadWidths(widths); // 상태 업데이트
    //     };
    
    //     calculateWidths(); // 너비 계산 함수 호출
    
    //     window.addEventListener('resize', calculateWidths); // 리사이즈 시 너비 재계산
    //     return () => {
    //         window.removeEventListener('resize', calculateWidths); // 컴포넌트 언마운트 시 리스너 제거
    //     };
    // }, []); // 빈 배열로 처음 렌더링될 때만 실행

    drag(drop(ref)); // ref에 drag와 drop 연결
    
    return (
        <div
            ref={ref}
            style={{
              //  width: TableHeadWidths[index] ? `${TableHeadWidths[index]}px` : 'auto', // 현재 컬럼 너비 설정
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                opacity: isDragging ? 0.3 : 1, // 드래그 중일 때 불투명도 변경
                cursor: 'move',
                userSelect: 'none'
            }}
            onClick={() => onSort(column.key)} // 클릭 시 정렬 함수 호출
        >
            {column.name} {sortOrder ? (sortOrder === 'asc' ? <MdArrowDropUp size="20" /> : <MdArrowDropDown size="20" />) : ''}
            {/*정렬 상태에 따라 화살표 표시*/}
            <div
                style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '5px', cursor: 'col-resize', zIndex: 1 }}
                onMouseDown={(e) => onMouseDown(index, e)} // 리사이즈 시작
            />
        </div>
    );
};



// CommonDataGrid 컴포넌트 정의
const CommonDataGrid: NextPage<DataGridProps> = ({ columns = [], rows = [] }) => {
    console.log("Columns: ", columns);
    console.log("Rows: ", rows);
    const [columnWidths, setColumnWidths] = useState(columns.map(() => 100)); // 컬럼 너비 초기화
    const [resizing, setResizing] = useState<{ index: number; initialX: number; initialWidth: number } | null>(null); // 리사이즈 상태 관리
    const [currentColumns, setCurrentColumns] = useState(columns); // 현재 컬럼 상태 관리
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }[]>([]); // 정렬 설정 상태 관리
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 관리
    const [rowsPerPage, setRowsPerPage] = useState(10); // 페이지 당 보여줄 행 수 상태 관리
    const [currentRows, setCurrentRows] = useState(rows); // 현재 행 상태 관리

    const tableRef = useRef<HTMLDivElement>(null); // 테이블 참조

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            if (resizing) {
                const delta = e.clientX - resizing.initialX;
                const newWidths = [...columnWidths];
                newWidths[resizing.index] = Math.max(resizing.initialWidth + delta, 50); // 최소 너비 50px 제한
                setColumnWidths(newWidths); // 너비 갱신
            }
        };

        const onMouseUp = () => setResizing(null); // 리사이즈 종료 시 상태 초기화

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
    }, [resizing, columnWidths]);

    const onMouseDown = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setResizing({ index, initialX: e.clientX, initialWidth: columnWidths[index] }); // 리사이즈 시작 시 상태 설정
    };

    const moveColumn = useCallback((dragIndex: number, hoverIndex: number) => {
        const draggedColumn = currentColumns[dragIndex];
        const newColumns = [...currentColumns];
        newColumns.splice(dragIndex, 1);
        newColumns.splice(hoverIndex, 0, draggedColumn);
        setCurrentColumns(newColumns); // 드래그 앤 드롭으로 컬럼 순서 변경
    }, [currentColumns]);

    const handleSort = (columnKey: string) => {
        const existingSort = sortConfig.find(config => config.key === columnKey);
        let newSortConfig;

        if (existingSort) {
            if (existingSort.direction === 'asc') {
                newSortConfig = sortConfig.map(config =>
                    config.key === columnKey
                        ? { key: columnKey, direction: 'desc' }
                        : config
                );
            } else if (existingSort.direction === 'desc') {
                newSortConfig = sortConfig.filter(config => config.key !== columnKey);
            }
        } else {
            newSortConfig = [...sortConfig, { key: columnKey, direction: 'asc' }];
        }

        // @ts-ignore
        setSortConfig(newSortConfig); // 정렬 상태 갱신
    };

    const onRowDoubleClick = (row:any) => {
        const updatedRows = currentRows.filter(r => r !== row);
        setCurrentRows(updatedRows); // 상태 업데이트
    }

    const sortedRows = useCallback(
        (rows: any[]) => {
            return rows.sort((a, b) => {
                for (let { key, direction } of sortConfig) {
                    if (a[key] < b[key]) {
                        return direction === 'asc' ? -1 : 1;
                    }
                    if (a[key] > b[key]) {
                        return direction === 'asc' ? 1 : -1;
                    }
                }
                return 0;
            });
        },
        [sortConfig]
    );

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(event.target.value));
        setCurrentPage(1); // 페이지당 행 수 변경 시 페이지를 1로 초기화
    };

    const paginatedRows = sortedRows(currentRows).slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage); // 페이지네이션된 행

    const totalPages = Math.ceil(currentRows.length / rowsPerPage); // 총 페이지 수 계산

    const handlePageChange = (page: number) => {
        setCurrentPage(page); // 페이지 변경
    };
    

    const pageRange = 10; 
    //페이지를 몇개씩 보여줄 것인지
    const startPage = Math.floor((currentPage - 1) / pageRange) * pageRange + 1;
    const endPage = Math.min(startPage + pageRange - 1, totalPages);

    useEffect(()=>{
        setCurrentColumns(columns);
        setCurrentRows(rows);
    },[columns, rows])
    
    return (
        <DndProvider backend={HTML5Backend}>
            <div ref={tableRef} className='table_content'>
                {/* <div style={{ marginBottom: '10px' }}>
                    <span>Rows per page: </span>
                    <select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                    </select>
                    <span> of {rows.length} </span> // 총 데이터 건수 표시 
                </div> */}
                <div className='table_head'>
                    {currentColumns.map((column, index) => (
                        <Column
                            key={index}
                            column={column}
                            index={index}
                            moveColumn={moveColumn}
                            columnWidths={columnWidths}
                            onMouseDown={onMouseDown}
                            onSort={handleSort}
                            sortOrder={sortConfig.find(config => config.key === column.key)?.direction || null}
                            />
                    ))}
                </div>
                <div className='table_body'>
                    {paginatedRows.map((row, index2) => (
                        <div key={index2} className='row'>
                            {currentColumns.map((column, index) => (
                                <div key={`${index2}-${index}`} style={{ width: columnWidths[index] }} className='cell'>
                                    {row[column.key]}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className='pagination'>
            <button disabled={currentPage === 1} onClick={() => handlePageChange(1)}>
                <MdOutlineKeyboardArrowLeft />
            </button>
            <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                <MdOutlineKeyboardDoubleArrowLeft />
            </button>

            {/* startPage에서 endPage까지 페이지 버튼을 렌더링 */}
            {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
                const pageIndex = startPage + index;
                return (
                    <button
                        key={pageIndex}
                        className={currentPage === pageIndex ? 'current' : ''}
                        onClick={() => handlePageChange(pageIndex)}
                    >
                        {pageIndex}
                    </button>
                );
            })}

            <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
                <MdOutlineKeyboardArrowRight />
            </button>
            <button disabled={currentPage === totalPages} onClick={() => handlePageChange(totalPages)}>
                <MdOutlineKeyboardDoubleArrowRight />
            </button>
        </div>
            </div>
        </DndProvider>
    );
};

export default CommonDataGrid; // CommonDataGrid 컴포넌트 기본 export