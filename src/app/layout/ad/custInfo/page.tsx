"use client";
import CommonLayout from "../../../components/layout/CommonLayout";
import CommonToggle from "@/app/components/CommonToggle";
import CommonDatepicker from "@/app/components/CommonDatepicker";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { IoIosArrowDown, IoIosClose } from "react-icons/io";
import { MdOutlineCalendarToday } from "react-icons/md";
import CommonDataGrid from "@/app/components/CommonDataGrid";
import { IoIosSearch } from "react-icons/io";
import { GrClose } from "react-icons/gr";

import {useEffect, useState} from "react";
import restApi from "@/app/resources/js/Axios";
import GetConst from "@/app/resources/js/Const";

export default function page (){
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isTabOpen, setIsTabOpen] = useState(false);
    const [filterClass, setFilterClass] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dbList, setDbList] = useState([]);
    const [selectedDbType, setSelectedDbType] = useState("init");
    const [selectedDb, setSelectedDb] = useState("init");
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);

  // 모달 열기 함수
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

    // 클릭 핸들러
    const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      const clickedElement = e.currentTarget;
  
      // 조건에 따라 클래스 설정
      if (clickedElement.classList.contains('text')) {
        setFilterClass('text');
      } else if (clickedElement.classList.contains('cal')) {
        setFilterClass('calendar');
      } else if (clickedElement.classList.contains('check')) {
        setFilterClass('check');
    } else if (clickedElement.classList.contains('toggle')) {
        setFilterClass('toggle');
      } else {
        setFilterClass(''); // 아무 클래스도 없을 때
      }
    };

    useEffect(() => {
        restApi('get', '/custInfo/custDBCode/list', {}).then(response => {
            // @ts-ignore
            if(response.status === 200){
                setDbList(response.data);
            }else{
                alert(response.data)
            }
        })
    }, []);

    useEffect(() => {
        if(selectedDb !== "init"){
            restApi('get', '/custInfo/list', {
                custDBType:selectedDbType,
                custDBCode:selectedDb,
            }).then(response => {
                // @ts-ignore
                if(response.status === 200){
                    console.log(response.data);
                    setColumns(response.data.columnInfoList);
                    setRows(response.data.dataList);
                }else{
                    alert(response.data)
                }
            });
        }
    }, [selectedDb]);
    return (
<CommonLayout>

   {/* 모달 */}
   {isModalOpen && (
  <div>
          <div className="modal_wrap">
          <div className="modal_header">
            <span>업체 정보 리스트</span>
            <GrClose size="22" onClick={closeModal} />
          </div>
          <div className="modal_body">
<ul>
    <li>
        <label>유저ID</label>
        <input type="text" value="Data" />
    </li>
    <li>
        <label>업체명</label>
        <input type="text" value="Data" />
    </li>
    <li>
        <label>대표명</label>
        <input type="text" value="Data" />
    </li>
    <li>
        <label>사업자등록번호</label>
        <input type="text" value="Data" />
    </li>
    <li>
        <label>사업장소재지</label>
        <input type="text" value="Data" />
    </li>
    <li>
        <label>업태</label>
        <input type="text" value="Data" />
    </li>
    <li>
        <label>업종</label>
        <input type="text" value="Data" />
    </li>
    <li>
        <label>유저ID</label>
        <input type="text" value="Data" />
    </li>
    <li>
        <label>업체명</label>
        <input type="text" value="Data" />
    </li>
    <li>
        <label>대표명</label>
        <input type="text" value="Data" />
    </li>
    <li>
        <label>사업자등록번호</label>
        <input type="text" value="Data" />
    </li>
    <li>
        <label>사업장소재지</label>
        <input type="text" value="Data" />
    </li>
    <li>
        <label>업태</label>
        <input type="text" value="Data" />
    </li>
    <li>
        <label>업종</label>
        <input type="text" value="Data" />
    </li>
</ul>

          </div>
          <div className="modal_foot">
            <button type="button">수정</button> <button type="button" className="disable">삭제</button>
          </div>
         
        </div>
         <div className="modal_bg" />
  </div>

      )}

{/* ---- */}

<div className="custInfo_wrap">
    <div className="title_box">
        <h2>유저정보 리스트</h2>
        <div>
                 <select defaultValue={selectedDbType} onChange={(event) => {
                    setSelectedDbType(event.target.value)
                }}>
                    <option value="init" disabled>
                        데이터 유형을 선택해주세요
                    </option>
                    {dbList.map((dbType) => (
                        <option key={dbType.custDbType} value={dbType.custDbType}>
                            {GetConst("dbTypeList")[dbType?.custDbType]}
                        </option>
                    ))}
                </select>
                <select defaultValue={selectedDb} onChange={(event) => {setSelectedDb(event.target.value)}}>
                    <option value="init" disabled>
                    데이터 URL을 선택해주세요
                    </option>
                    {dbList.map((dbType, index) => {
                        if (dbType.custDbType === selectedDbType) {
                            return dbType.custDbCodeList.map((db, index2) => (
                                <option key={db.key} value={db.key}>
                                    {db[db.key]}
                                </option>
                            ));
                        }
                        return null; // 특정 조건의 경우 아무것도 반환하지 않는 경우를 처리
                    })}
                </select>
            </div>
    </div>

    <div className="top_section">
        <div className="filter">
            <div className={`search_filter ${isFilterOpen ? 'on_filter' : ''} ${isTabOpen ? 'on_tab' : ''}`} >
                <button type="button" className="type2"  onClick={() => setIsFilterOpen(!isFilterOpen)} >필터<IoIosArrowDown color="#fff" /></button>
            <div className="output">
                <ul className="list">
                    <li className="text" onClick={handleClick}>이름</li>
                    <li className="cal" onClick={handleClick}>날짜</li>
                    <li className="check" onClick={handleClick}>실비</li>
                    <li className="toggle" onClick={handleClick}>품질</li>
                    <li>품질변경사유</li>
                    <li>상태</li>
                    <li>상태변경사유</li>
                    <li>사용여부</li>
                </ul>
                <div className={`filter_box ${filterClass}`}>
                 {/* calendar type */}
                 <div className="calendar_type">
            <p>
            <MdOutlineCalendarToday /> 날짜
            </p>
            <CommonDatepicker />
        </div>

        {/* toggle type */}
        <div className="toggle_type">
            <ul>
                <li className="toggle_box"><span>옵션1</span><CommonToggle /> </li>
            </ul>
        </div>

        {/* check type */}
        <div className="check_type">
            <ul>
                <li>
                    <input type="checkbox" name="" id="1" /> <label htmlFor="1">체크리스트1</label>
                </li>
            </ul>
        </div>

        {/* text_type */}
        <div className="text_type">
            <div className="input_box">
            <IoIosSearch /><input type="text" placeholder="검색어를 입력하세요" />
            </div>

            <ul>
                {/* 검색했을 때 뜨는 자동 결과값 */}
                <li>11</li>
                <li>22</li>
                <li>33</li>
            </ul>
            </div>
        </div>
    </div>

    {/* 검색필터 end */}
    {/* 탭 표시 start */}
    <button type="button" className="type1"  onClick={() => setIsTabOpen(!isTabOpen)}>탭 표시<IoIosArrowDown color="#fff" /></button>
    <div className="output_t">
    <ul className="list">
            <li>이름</li>
            <li>날짜</li>
            <li>실비</li>
            <li>품질</li>
        </ul>
    </div>
</div>

<div className="right">
    {/* <div className="input_box">
    <IoIosSearch /><input type="text" placeholder="검색어를 입력하세요" />
    </div> */}
    <button type="button" className="excel"><PiMicrosoftExcelLogoFill color="#fff" /></button>

    {/* modal */}
    <button className="modalOpen" onClick={openModal}>모달오픈</button>
    {/* modal end */}
    </div>
        </div>
        <div className="tag_box">
            <button className="tag">ID <IoIosClose/></button>
            <button className="tag">Country <IoIosClose/></button>
        </div>
    </div>
    <section className="table">
        <CommonDataGrid columns={columns} rows={rows}/>
</section>
</div>
</CommonLayout>
    )
}