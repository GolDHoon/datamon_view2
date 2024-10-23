"use client";
import CommonLayout from "../../../components/layout/CommonLayout";
// import Modal from "../../../../components/layout/ad/custInfo/Modal";
import CommonDataGrid from "@/app/components/CommonDataGrid";

import {useEffect, useState} from "react";
// import restApi from "@/app/resources/js/Axios";
// import GetConst from "@/app/resources/js/Const";
import {useRouter} from "next/navigation";
// import {getSession} from "@/app/resources/js/Session";
import {columnInfoList, dataList} from "../../../resources/testdb/db.json";


// // PageProps 타입 정의
// interface PageProps {
//     params: {
//         dynamic: string;
//     };
// }

// 페이지 컴포넌트
const Page: React.FC = () => {
    // const { dynamic } = params;
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dbList, setDbList] = useState([]);
    // const [selectedDbType, setSelectedDbType] = useState("init");
    // const [selectedDb, setSelectedDb] = useState("init");
    const [columns, setColumns] = useState(columnInfoList);
    const [rows, setRows] = useState(dataList);
    const [selectRow, setSelectRow] = useState();

  // 모달 열기 함수
//   const openModal = () => {
//     setIsModalOpen(true);
//   };

  // 모달 닫기 함수
//   const closeModal = () => {
//     setIsModalOpen(false);
//     getDataList()
//   };
//   setIsModalOpen(true);

  const handleOnRowDoubleClick = (idx:any) => {
    //   setSelectRow(rows.find((row:any)=>row.idx === idx));
    //   openModal()
  }

  const getDataList = () => {
    //   try{
    //       restApi('get', '/custInfo/list', {
    //           custDBType:selectedDbType,
    //           custDBCode:selectedDb,
    //       }).then(response => {
    //           // @ts-ignore
    //           if(response.status === 200){
    //               setColumns(response.data.columnInfoList);
    //               setRows(response.data.dataList);
    //           }else{
    //               alert(response.data)
    //           }
    //       });
    //   }catch (error){
    //       // @ts-ignore
    //       router.push('/' + getSession("companyName") + '/login');
    //   }
  }

    // useEffect(() => {
    //     if(dynamic !== 'list'){
    //         router.push('/home');
    //     }

    //     if(!["USTY_DEVL", "USTY_ADAC", "USTY_AAME"].includes(getSession("userType") as string)){
    //         router.push('/home');
    //     }

    //     try {
    //         restApi('get', '/custInfo/custDBCode/list', {}).then(response => {
    //             // @ts-ignore
    //             if(response.status === 200){
    //                 setDbList(response.data);
    //             }else{
    //                 alert(response.data)
    //             }
    //         })
    //     }catch (error) {
    //         // @ts-ignore
    //         router('/' + getSession("companyName") + '/login');
    //     }
    // }, []);

    // useEffect(() => {
    //     if(selectedDb !== "init"){
    //         getDataList()
    //     }
    // }, [selectedDb]);
    return (
<CommonLayout>
{/* <Modal isOpen={isModalOpen} onClose={closeModal} typeList={columns} dataJson={selectRow}/> */}

{/* ---- */}

    <div className="custInfo_wrap">
        <div className="title_box">
            <h2>admin 계정 승인신청 목록</h2>
           
        </div>

        <section className="table">
            <CommonDataGrid
                columns={columns}
                rows={rows}
                // downLoadFileName={`고객정보목록_${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`}
                handleRowDoubleClick={handleOnRowDoubleClick}
                useExcelDownload={false}
                useTabFilterButton={false}
                useNewContentButton={true}
            />
        </section>
    </ div>
</CommonLayout>
    )
}

export default Page;