"use client";
import CommonLayout from "../../../../components/layout/CommonLayout";
import CommonDataGrid from "@/app/components/CommonDataGrid";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import restApi from "@/app/resources/js/Axios";
import {getSession} from "@/app/resources/js/Session";
import Modal from "@/app/components/layout/custDb/landing/Modal";


// PageProps 타입 정의
interface PageProps {
    params: {
        dynamic: string;
    };
}

// 페이지 컴포넌트
const Page: React.FC<PageProps> = ({ params }) => {
    const { dynamic } = params;
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [columns, setColumns] = useState<any[]>([]);
    const [rows, setRows] = useState<any[]>([]);    const [openMode, setOpenMode] = useState("C");

    // 모달 열기 함수
    const openModal = () => {
        // @ts-ignore
        setOpenMode();
        setIsModalOpen(true);
    };

    // 모달 닫기 함수
    const closeModal = () => {
        setIsModalOpen(false);
        getDataList();
    };

    const handleNewContentButtonClick = () => {
        openModal();
    }

    const handleOnRowDoubleClick = (idx:any) => {
        // @ts-ignore
        router.push('/custDb/landing/detail?id='+idx);
    }

    const getDataList = () => {
        try {
            restApi('get', '/custDb/lpge/list', {}).then(response => {
                // @ts-ignore
                if(response.status === 200){
                    setColumns(response.data.columnInfoList);
                    setRows(response.data.dataList);
                }else{
                    alert(response.data)
                    // @ts-ignore
                    router.push('/' + getSession("companyName") + '/login');
                }
            })
        }catch (errro) {
            // @ts-ignore
            router.push('/' + getSession("companyName") + '/login');
        }
    }

    useEffect(() => {
        if(dynamic !== 'list'){
            router.push('/home');
        }

        getDataList();
    }, []);

    return (
        <CommonLayout>
            <Modal isOpen={isModalOpen} onClose={closeModal}/>
            <div className="custInfo_wrap">
                <div className="title_box">
                    <h2>랜딩페이지 DB 관리</h2>
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
                        handleNewContentButtonClick={handleNewContentButtonClick}
                    />
                </section>
            </ div>
        </CommonLayout>
    )
}

export default Page;