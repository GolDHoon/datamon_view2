"use client";
import CommonLayout from "../../../../components/layout/CommonLayout";
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

// PageProps 타입 정의
interface PageProps {
    params: {
        dynamic: string;
    };
}

// 페이지 컴포넌트
const Page: React.FC<PageProps> = ({ params }) => {
    const { dynamic } = params;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dbList, setDbList] = useState([]);
    const [selectedDbType, setSelectedDbType] = useState("init");
    const [selectedDb, setSelectedDb] = useState("init");
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    const [selectedIdx, setSelectedIdx] = useState();

  // 모달 열기 함수
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };


  const handleOnRowDoubleClick = (idx:any) => {
      console.log(idx)
      debugger
      setSelectedIdx(idx)
      openModal()
  }

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
                <select defaultValue="init" onChange={(event) => {
                    const selectedValue = event.target.value.split('|');
                    setSelectedDbType(selectedValue[0]);
                    setSelectedDb(selectedValue[1]);
                }}>
                    <option value="init" disabled>
                        DB선택
                    </option>
                    {dbList.map((dbType: any) => (
                        <optgroup key={dbType.custDbType} label={GetConst("dbTypeList")[dbType.custDbType]}>
                            {dbType.custDbCodeList.map((db: any) => (
                                <option key={db.key} value={`${dbType.custDbType}|${db.key}`}>
                                    {db[db.key]}
                                </option>
                            ))}
                        </optgroup>
                    ))}
                </select>
            </div>
        </div>


        {/* <button className="modalOpen" onClick={openModal}>모달오픈</button> */}
        <section className="table">
            <CommonDataGrid
                columns={columns}
                rows={rows}
                downLoadFileName={`고객정보목록_${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`}
                handleRowDoubleClick={handleOnRowDoubleClick}/>
        </section>
    </div>
</CommonLayout>
    )
}

export default Page;