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
                <select defaultValue={selectedDb} onChange={(event) => {
                    setSelectedDb(event.target.value)
                }}>
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


        {/* <button className="modalOpen" onClick={openModal}>모달오픈</button> */}
        <section className="table">
            <CommonDataGrid columns={columns} rows={rows}/>
        </section>
    </div>
</CommonLayout>
    )
}