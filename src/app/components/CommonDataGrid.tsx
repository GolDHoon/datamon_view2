import React, { useState, useRef, useEffect, useCallback } from 'react'; // React와 필요한 hook들 import
import { NextPage } from "next"; // Next.js의 NextPage 타입 import
import { useDrag, useDrop, DndProvider } from 'react-dnd'; // react-dnd를 위한 hook들 import
import { HTML5Backend } from 'react-dnd-html5-backend'; // HTML5Backend를 사용하는 react-dnd 프론트엔드 백엔드 import
import {
    MdArrowDropUp,
    MdArrowDropDown,
    MdOutlineKeyboardArrowLeft,
    MdOutlineKeyboardArrowRight,
    MdOutlineKeyboardDoubleArrowLeft,
    MdOutlineKeyboardDoubleArrowRight,
    MdOutlineCalendarToday
} from "react-icons/md";
import {IoIosArrowDown, IoIosClose, IoIosSearch} from "react-icons/io";
import CommonDatepicker from "@/app/components/CommonDatepicker";
import CommonToggle from "@/app/components/CommonToggle";
import {PiMicrosoftExcelLogoFill} from "react-icons/pi";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;

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

    drag(drop(ref)); // ref에 drag와 drop 연결

    return (
        <div
            ref={ref}
            style={{
                width: columnWidths[index] || 150, // 컬럼 너비 초기화 및 NaN 방지
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                opacity: isDragging ? 0.5 : 1, // 드래그 중일 때 불투명도 변경
                cursor: 'move',
                userSelect: 'none'
            }}
            onClick={() => onSort(column.key)} // 클릭 시 정렬 함수 호출
        >
            {column.name} {sortOrder ? (sortOrder === 'asc' ? <MdArrowDropUp size="20" /> : <MdArrowDropDown size="20" />) : ''}
            {/*정렬 상태에 따라 화살표 표시*/}
            <div
                onMouseDown={(e) => onMouseDown(index, e)} // 리사이즈 시작
                className='cell_resize'
            />
        </div>
    );
};

// CommonDataGrid 컴포넌트 정의
const CommonDataGrid: NextPage<DataGridProps> = ({ columns = [], rows = [] }) => {
    const [columnWidths, setColumnWidths] = useState<number[]>(columns.map(() => 100)); // 컬럼 너비 초기화
    const [resizing, setResizing] = useState<{ index: number; initialX: number; initialWidth: number } | null>(null); // 리사이즈 상태 관리
    const [currentColumns, setCurrentColumns] = useState(columns); // 현재 컬럼 상태 관리
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }[]>([]); // 정렬 설정 상태 관리
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 관리
    const [rowsPerPage, setRowsPerPage] = useState(10); // 페이지 당 보여줄 행 수 상태 관리
    const [currentRows, setCurrentRows] = useState(rows); // 현재 행 상태 관리
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isTabOpen, setIsTabOpen] = useState(false);
    const [filterClass, setFilterClass] = useState('');
    const [currentFilterKey, setCurrentFilterKey] = useState('')
    const [filterList, setFilterList] = useState([])
    const [autoTempComplateFilterList, setTempAutoComplateFilterList] = useState([]);
    const [autoComplateFilterList, setAutoComplateFilterList] = useState([]);
    const [checkList, setCheckList] = useState([]);

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

    useEffect(() => {
        setColumnWidths(columns.map(() => 100)); // 컬럼이 변경될 때마다 너비 초기화
    }, [columns]);

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

    const onRowDoubleClick = (row: any) => {
        const updatedRows = currentRows.filter(r => r !== row);
        setCurrentRows(updatedRows); // 상태 업데이트
    }

    const sortedRows = useCallback(
        (currentRows: any[]) => {
            // currentRows가 undefined일 경우 빈 배열로 초기화
            currentRows = currentRows || [];

            if (currentRows.length <= 1) {
                return currentRows;
            }

            return currentRows.sort((a, b) => {
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

    // 클릭 핸들러
    const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, data: any) => {
        const clickedElement = e.currentTarget;

        setCurrentFilterKey(data.key);

        // 조건에 따라 클래스 설정
        if (clickedElement.classList.contains('text')) {
            setFilterClass('text');
            // @ts-ignore
            setAutoComplateFilterList([
                ...new Set(rows.map(row => JSON.stringify({ key:[data.key], [data.key]: row[data.key] })))
            ].map(str => JSON.parse(str)));
            setTempAutoComplateFilterList([
                ...new Set(rows.map(row => JSON.stringify({ key:[data.key], [data.key]: row[data.key] })))
            ].map(str => JSON.parse(str)));
        } else if (clickedElement.classList.contains('cal')) {
            setFilterClass('calendar');
        } else if (clickedElement.classList.contains('check')) {
            setCheckList([
                ...new Set(rows.map(row => JSON.stringify({ key:[data.key], [data.key]: row[data.key] })))
            ].map(str => JSON.parse(str)));
            setFilterClass('check');
        } else if (clickedElement.classList.contains('toggle')) {
            setFilterClass('toggle');
        } else {
            setFilterClass(''); // 아무 클래스도 없을 때
        }
    };

    const handleTextFilter = (event: any) => {
        if (event.target.value === '') {
            setAutoComplateFilterList(autoTempComplateFilterList);
        } else {
            // @ts-ignore
            setAutoComplateFilterList(
                autoTempComplateFilterList.filter(item =>
                    item[item.key].includes(event.target.value)
                )
            );
        }
        return null;
    }

// 내가 누른 필터 리스트랑 currentFilterKey값이 같은걸 찾아서
// setFilterList를 갱신함(currentFilterKey값이 같은걸 없는 버전으로)
    const handleClickFilter = (clickedFilter) => {
        // 클릭한 필터를 제외한 새로운 리스트로 상태 업데이트
        const updatedFilterList = filterList.filter(filter => (filter.name !== clickedFilter.name || filter.value !== clickedFilter.value))
        setFilterList(updatedFilterList); // 상태 갱신
    };
    const handleAutoComplateFilterRegister = (value: any) => {
        const newFilter = {
            key: currentFilterKey,
            value: value,
            name: currentColumns.find(column => column.key === currentFilterKey)?.name,
            type: currentColumns.find(column => column.key === currentFilterKey)?.filterType
        };
        const updatedFilterList = [...filterList, newFilter];
        // @ts-ignore
        setFilterList(updatedFilterList);
    }

    const handleCheckFilterRegister = (event:any, check:any) => {
        const checkedInputs = document.querySelectorAll('input[name="' + event.target.name + '"]:checked');
        const labels = Array.from(checkedInputs).map(input => {
            const label = document.querySelector('label[for="' + input.id + '"]');
            return label ? label.innerText : ''; // label이 존재하는 경우에만 innerText를 반환
        }).filter(text => text !== ''); // 빈 텍스트는 제외
        const result = labels.join(', ');

        let updatedFilterList = filterList.filter(filter => filter.key !== currentFilterKey);

        if(checkedInputs.length !== 0){
            updatedFilterList.push({
                key: currentFilterKey,
                value: result,
                name: currentColumns.find(column => column.key === currentFilterKey)?.name,
                type: currentColumns.find(column => column.key === currentFilterKey)?.filterType
            });
        }

        // @ts-ignore
        setFilterList(updatedFilterList);
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(event.target.value));
        setCurrentPage(1); // 페이지당 행 수 변경 시 페이지를 1로 초기화
    };

    const paginatedRows = sortedRows(currentRows).slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage); // 페이지네이션된 행

    const totalPages = currentRows ? Math.ceil(currentRows.length / rowsPerPage) : 0; // 총 페이지 수 계산

    const handlePageChange = (page: number) => {
        setCurrentPage(page); // 페이지 변경
    };

    const pageRange = 10;
    //페이지를 몇개씩 보여줄 것인지
    const startPage = Math.floor((currentPage - 1) / pageRange) * pageRange + 1;
    const endPage = Math.min(startPage + pageRange - 1, totalPages);

    useEffect(() => {
        let tempRows = rows
        filterList.forEach(filter => {
            switch (filter.type){
                case "text":tempRows = tempRows.filter(row => row[filter.key].includes(filter.value));
                    break;
                case "select": tempRows = tempRows.filter(row => filter.value.includes(row[filter.key]));
                    break;
                default:break;
            }
        })
        setCurrentRows(tempRows)
    }, [filterList]);

    useEffect(() => {
        setCurrentColumns(columns);
        setCurrentRows(rows);
    }, [columns, rows]);

    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                <div className="top_section">
                    <div className="filter_wrap">
                        <div
                            className={`search_filter ${isFilterOpen ? 'on_filter' : ''} ${isTabOpen ? 'on_tab' : ''}`}>
                            {/* 검색필터 start */}
                            <div className='search'>
                                <button type="button" className="type2"
                                        onClick={() => setIsFilterOpen(!isFilterOpen)}>필터<IoIosArrowDown color="#fff"/>
                                </button>
                                <div className="output">
                                    <ul className="list">
                                        {currentColumns.map((data, index) => {
                                            switch (data.filterType) {
                                                case "text" : {
                                                    return <li key={index} className="text"
                                                               onClick={event => handleClick(event, data)}>{data.name}</li>
                                                }
                                                case "select": {
                                                    return <li key={index} className="check"
                                                               onClick={event => handleClick(event, data)}>{data.name}</li>
                                                }
                                                case "date" : {
                                                    return <li key={index} className="cal"
                                                               onClick={event => handleClick(event, data)}>{data.name}</li>
                                                }
                                                case "toggle": {
                                                    return <li key={index} className="toggle"
                                                               onClick={event => handleClick(event, data)}>{data.name}</li>;

                                                }
                                                default :
                                                    return null;
                                            }
                                        })}
                                    </ul>
                                    <div className={`filter_box ${filterClass}`}>
                                        {/* calendar type */}
                                        <div className="calendar_type">
                                            <p>
                                                <MdOutlineCalendarToday/> 날짜
                                            </p>
                                            <CommonDatepicker/>
                                        </div>

                                        {/* toggle type */}
                                        <div className="toggle_type">
                                            <ul>
                                                <li className="toggle_box"><span>옵션1</span><CommonToggle/></li>
                                            </ul>
                                        </div>

                                        {/* check type */}
                                        <div className="check_type">
                                            <ul>
                                                {checkList.map((check, index)=> (
                                                    <li key={index}>
                                                        <input type="checkbox" name={check.key} id={`${check[check.key]}-${index}`} onChange={(event) => handleCheckFilterRegister(event, check)}/>
                                                        <label htmlFor={`${check[check.key]}-${index}`}>{check[check.key]}</label>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* text_type */}
                                        <div className="text_type">
                                            <div className="input_box">
                                                <IoIosSearch/><input type="text" placeholder="검색어를 입력하세요"
                                                                     onChange={event => handleTextFilter(event)}
                                                                     onKeyDown={event => {
                                                                         if (event.key === 'Enter') {
                                                                             handleAutoComplateFilterRegister(event.target.value)
                                                                         }
                                                                     }}/>
                                            </div>

                                            <ul>
                                                {/* 검색했을 때 뜨는 자동 결과값 */}
                                                {autoComplateFilterList.map((auto, index) => (
                                                    <li key={index} onClick={(evnet) => handleAutoComplateFilterRegister(auto[auto.key])}>{auto[auto.key]}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                {/* 검색필터 end */}
                                {/* 탭 표시 start */}
                                <div className='tab'>
                                    <button type="button" className="type1" onClick={() => setIsTabOpen(!isTabOpen)}>탭
                                        표시<IoIosArrowDown color="#fff"/></button>
                                    <div className="output_t">
                                    <ul className="list">
                                        {currentColumns.map((data, index) => (
                                            <li key={index} onClick={()=>console.log("누름")}>{data.name}</li>
                                        ))}
                                    </ul>
                                    </div>
                                </div>
                                {/* 탭 표시 end */}                        </div>
                            <div className='filter_value'>
                                {
                                    filterList.map((filter, index) => (
                                        <span key={index}> <b>{`${filter.name}:`}</b> {`${filter.value}`} <IoIosClose   onClick={() => handleClickFilter(filter)}/></span>
                                    ))
                                }
                            </div>

                            <div className="right">
                                {/* <div className="input_box">
                            <IoIosSearch /><input type="text" placeholder="검색어를 입력하세요" />
                            </div> */}
                                <button type="button" className="excel"><PiMicrosoftExcelLogoFill color="#fff"/></button>


                            </div>
                        </div>
                        <div className="tag_box">
                            <button className="tag">ID <IoIosClose/></button>
                            <button className="tag">Country <IoIosClose/></button>
                        </div>
                    </div>
                </div>
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