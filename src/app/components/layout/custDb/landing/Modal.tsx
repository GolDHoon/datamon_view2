"use client";
import {useEffect, useState} from 'react';
import {GrClose} from 'react-icons/gr';
import GetConst from "@/app/resources/js/Const";
import restApi from "@/app/resources/js/Axios";

interface ModalProps {
    isOpen: boolean,
    onClose: () => void,
}

export default function Modal({isOpen, onClose}: ModalProps) {
    const [data, setData] = useState({
        url: "",
        description: "",
    });

    const handleCreate = () => {
        restApi('post', '/custDb/lpge/create', {
            url: data.url,
            description: data.description,
        }).then(response => {
            debugger;
            // @ts-ignore
            if(response.status === 200) {
                onClose();
            } else {
                alert(response.data);
            }
        });
    }

    useEffect(() => {
        setData({
            url: "",
            description: "",
        });
    }, []);

    if (Object.keys(data).length === 0) return null;
    if (!isOpen) return null;

    return (
        <>
            <div className="modal_wrap">
                <div className="modal_header">
                    <span>업체 정보 리스트</span>
                    <GrClose size="22" onClick={(event) => onClose()}/>
                </div>
                <div className="modal_body">
                    <ul>
                        <li>
                            <label>URL</label>
                            <input type={"text"} value={data?.url}
                                   onChange={(event) => setData({...data, url: event.target.value})}/>
                        </li>
                        <li>
                            <label>설명</label>
                            <input type={"text"} value={data?.description}
                                   onChange={(event) => setData({...data, description: event.target.value})}/>
                        </li>
                    </ul>
                </div>
                <div className="modal_foot">
                    <button type="button" onClick={(event) => handleCreate()}>생성</button>
                </div>
            </div>
            <div className="modal_bg" onClick={(event) => onClose()}/>
        </>
    );
}