'use client';
import {useEffect, useRef, useState} from "react";
import CommonLayout from "@/app/components/layout/CommonLayout";
import { GrClose } from 'react-icons/gr';
import { useRouter } from 'next/navigation';
import restApi from "@/app/resources/js/Axios";
import {getSession} from "@/app/resources/js/Session";

export default function DetailPage() {
    const router = useRouter();
    const [url, setUrl] = useState("")
    const [activeTab, setActiveTab] = useState("중복제거 칼럼 설정");
    const [blockIpList, setBlockIpList] = useState([]);
    const [blockKeywordList, setBlockKeywordList] = useState([]);
    const [duplColumnInfo, setDuplColumnInfo] = useState();
    const [landingInfo, setLandingInfo] = useState();
    const [landingMappingInfoList, setLandingMappingInfoList] = useState()
    const [urlList, setUrlList] = useState([])
    const [ipModalOpen, setIpModalOpen] = useState(false)
    const [ip, setIp] = useState("")
    const [keyword, setKeyword] = useState("")
    const [copyTargetDbCode, setCopyTargetDbCode] = useState("")
    const code = useRef("");

    const handleCreateKeyword = () => {
        if(keyword===""){
            alert("키워드를 입력해주세요.")
            return null;
        }else{
            // @ts-ignore
            if(blockKeywordList.includes(keyword)){
                alert("이미 차단된 키워드입니다.")
                return null;
            }
        }

        try {
            restApi('post', '/custDb/blockedKeyword/create', {
                dbCode:code.current,
                keyword: keyword
            }).then(response => {
                // @ts-ignore
                if(response.status === 200){
                    alert("생성이 완료되었습니다.");
                    const queryParams = new URLSearchParams(window.location.search);
                    const id = queryParams.get('id');
                    if(!!id){
                        getData(id);
                    }
                }else{
                    alert(response.data);
                }
            })
        }catch (error) {
            // @ts-ignore
            router.push('/' + getSession("companyName") + '/login');
        }
    }

    const handleDeleteKeyword = (keywordStr:any) => {
        try {
            restApi('post', '/custDb/blockedKeyword/delete', {
                dbCode:code.current,
                keyword: keywordStr
            }).then(response => {
                // @ts-ignore
                if(response.status === 200){
                    alert("삭제가 완료되었습니다.");
                    const queryParams = new URLSearchParams(window.location.search);
                    const id = queryParams.get('id');
                    if(!!id){
                        getData(id);
                    }
                }else{
                    alert(response.data);
                }
            })
        }catch (error) {
            // @ts-ignore
            router.push('/' + getSession("companyName") + '/login');
        }
    }

    const handleCopyBlockedIp = () => {
        try {
            restApi('post', '/custDb/blockedIp/copy', {
                targetDbCode:copyTargetDbCode,
                applyDbCode: code.current
            }).then(response => {
                // @ts-ignore
                if(response.status === 200){
                    alert(`총 ${response.data.copyCnt + response.data.duplCnt} 건 중, ${response.data.duplCnt} 건 중복, ${response.data.copyCnt} 건 복사가 완료되었습니다.`);
                    const queryParams = new URLSearchParams(window.location.search);
                    const id = queryParams.get('id');
                    if(!!id){
                        getData(id);
                        setIpModalOpen(false);
                    }
                }else{
                    alert(response.data);
                }
            })
        }catch (error) {
            // @ts-ignore
            router.push('/' + getSession("companyName") + '/login');
        }
    }

    const handleCreateIp = () => {
        if(ip===""){
            alert("ip를 입력해주세요.")
            return null;
        }else{
            // @ts-ignore
            if(blockIpList.includes(ip)){
                alert("이미 차단된 IP입니다.")
                return null;
            }
        }

        try {
            restApi('post', '/custDb/blockedIp/create', {
                dbCode:code.current,
                ip: ip
            }).then(response => {
                // @ts-ignore
                if(response.status === 200){
                    alert("생성이 완료되었습니다.");
                    const queryParams = new URLSearchParams(window.location.search);
                    const id = queryParams.get('id');
                    if(!!id){
                        getData(id);
                    }
                }else{
                    alert(response.data);
                }
            })
        }catch (error) {
            // @ts-ignore
            router.push('/' + getSession("companyName") + '/login');
        }
    }

    const handleDeleteIp = (ipStr:any)=> {
        try {
            restApi('post', '/custDb/blockedIp/delete', {
                dbCode:code.current,
                ip: ipStr
            }).then(response => {
                // @ts-ignore
                if(response.status === 200){
                    alert("삭제가 완료되었습니다.");
                    const queryParams = new URLSearchParams(window.location.search);
                    const id = queryParams.get('id');
                    if(!!id){
                        getData(id);
                    }
                }else{
                    alert(response.data);
                }
            })
        }catch (error) {
            // @ts-ignore
            router.push('/' + getSession("companyName") + '/login');
        }
    }

    const getData = (id:any) => {
        try {
            restApi('get', '/custDb/lpge/info', {
                idx:id,
                companyId: getSession("companyIdx")
            }).then(response => {
                // @ts-ignore
                if(response.status === 200){
                    code.current = response.data.code;
                    setUrl(response.data.url);
                    setBlockIpList(response.data.blockIpList);
                    setBlockKeywordList(response.data.blockKeywordList);
                    setDuplColumnInfo(response.data.duplColumnInfo);
                    setLandingInfo(response.data.landingInfo);
                    setLandingMappingInfoList(response.data.landingMappingInfoList);
                }else{
                    alert(response.data);
                }
            })
        }catch (error) {
            // @ts-ignore
            router.push('/' + getSession("companyName") + '/login');
        }
    }

    useEffect(() => {
        if(ipModalOpen){
            try {
                restApi('get', '/custDb/lpge/list', {}).then(response => {
                    // @ts-ignore
                    if(response.status === 200){
                        setUrlList(response.data.dataList);
                    }else{
                        alert(response.data);
                    }
                })
            }catch (error) {
                // @ts-ignore
                router.push('/' + getSession("companyName") + '/login');
            }
        }
    }, [ipModalOpen]);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('id');
        if(!!id){
            getData(id);
        }
    }, []);

    const renderTabContent = () => {
        switch (activeTab) {
            case "중복제거 칼럼 설정":
                return (
                    <div className="duplication">
                        <h4>중복제거 칼럼 설정</h4>
                        <ul className="duplication_list">
                            <li> <span>255.000.000.0</span></li>
                            <li> <span>255.000.000.0</span></li>
                        </ul>
                    </div>
                );
            case "IP차단":
                return (
                    <div className="ip">
                        <h4>IP차단 목록</h4>
                    <div className="input_box">
                        <input type="text" placeholder="ip" value={ip} onChange={(event) => setIp(event.target.value)}/>
                        <button type="button" className="type1" onClick={(event) => handleCreateIp()}>생성</button>
                        <button type="button" className="type2" onClick={(event) => setIpModalOpen(true)}>일괄복사</button>
                    </div>
                        <ul className="ip_list">
                            {blockIpList.map((ipStr, index) => {
                                if(ip !== ""){
                                    // @ts-ignore
                                    if(!ipStr.includes(ip)){
                                        return null;
                                    }
                                }
                                return (
                                    <li key={index}>
                                        <span>{ipStr}</span>
                                        <GrClose size="10" onClick={event => handleDeleteIp(ipStr)}/>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                );
            case "키워드차단":
                return (
                    <div className="keyword">
                        <h4>키워드 차단 목록</h4>
                    <div className="input_box">
                        <input type="text" placeholder="키워드를 입력하세요" value={keyword} onChange={(event) => setKeyword(event.target.value)}/>
                        <button type="button" className="type1" onClick={(event) => handleCreateKeyword()}>생성</button>
                    </div>
                        <ul className="keyword_list">
                            {blockKeywordList.map((keywordStr, index) => {
                                if(keyword !== ""){
                                    // @ts-ignore
                                    if(!keywordStr.includes(keyword)){
                                        return null;
                                    }
                                }
                                return (
                                    <li key={index}>
                                        <span>{keywordStr}</span>
                                        <GrClose size="10" onClick={event => handleDeleteKeyword(keywordStr)}/>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                );
            case "페이지설정":
            return(
                <div className="pagesetting">
                        <h4>페이지 설정</h4>
                      <ul className="pagesetting_list">
                        <li>
                            <p>title</p>
                            <input type="text" placeholder="title" />
                        </li>
                        <li>
                            <p>description</p>
                            <textarea name="" id=""></textarea>
                        </li>
                        <li>
                            <p>head</p>
                            <textarea name="" id=""></textarea>
                        </li>
                        <li>
                            <p>body</p>
                            <textarea name="" id=""></textarea>
                        </li>

                      </ul>
                      <div className="btn_box">
                <button type="button" className="type1">저장</button>
    </div>
                </div>
            )
           
                default:
                return null;
        }
    };

    return (
        <CommonLayout>
            {ipModalOpen && (
                <div className="modal">
                    <div className="modal_wrap copy_ver">
                        <div className="modal_header">
                            <span>IP차단 목록 복사</span>
                            <GrClose size="22" onClick={(event) => setIpModalOpen(false)}/>
                        </div>
                        <div>
                            <select name="" id="dbList" onChange={(event) => setCopyTargetDbCode(event.target.value)}>
                                {urlList.map((url, index) => {
                                    // @ts-ignore
                                    if(code.current === url?.dbCode){
                                        return null;
                                    }
                                    return (
                                        // @ts-ignore
                                        <option key={index} value={url?.dbCode}>{url?.url}</option>
                                    );
                                })}
                            </select>
                            <button type="button" className="type1" onClick={(event) => handleCopyBlockedIp()}>확인</button>
                        </div>
                    </div>
                    <div className="modal_bg"></div>
                </div>
            )}


            {/* <div className="modal">
<div className="modal_wrap copy_ver2">
<div className="modal_header">
                    <span>중복제거 정보</span>
                    <GrClose size="22" />
                </div>
    <div className="modal_body">
    <div className="left">
        <p>컬럼정보</p>
    <ul>
        <li>    
        <input type="checkbox" />
        <p>text</p>
        </li>
        <li>    
        <input type="checkbox" />
        <p>text</p>
        </li>
    </ul>
    </div>
    <div className="right">
    <p>처리 프로세스</p>
    <ul>
        <li>    
        <input type="checkbox" />
        <p>전처리</p>
        </li>
        <li>    
        <input type="checkbox" />
        <p>후처리</p>
        </li>
    </ul>
    </div>
    </div>
<div className="modal_foot">
    <div className="btn_box">
        <button type="button" className="type1">수정</button>
        <button type="button" className="type3">삭제</button>
        <button type="button" className="type1">생성</button>
    </div>
</div>
</div>
<div className="modal_bg"></div>
</div> */}

            {/* modal end */}
            <div className="landing_detail_wrap">
                <div className="title_box">
                    <h2>랜딩 페이지 상세정보- {url}</h2>
                </div>
        <section className="tab_wrap">
        <ul className="tab_menu">
                    {["중복제거 칼럼 설정", "IP차단", "키워드차단", "페이지설정"].map((tab) => (
                        <li 
                            key={tab} 
                            onClick={() => setActiveTab(tab)}
                            className={activeTab === tab ? "on" : ""}
                        >
                            {tab}
                        </li>
                    ))}
                </ul>
            <div className="tab_value">
            {renderTabContent()}
            </div>
        </section>
        </div>
        </CommonLayout>
    );
}
