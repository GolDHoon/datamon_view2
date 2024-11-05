'use client';
import {useEffect,useRef,useState} from "react";
import CommonLayout from "@/app/components/layout/CommonLayout";
import {GrClose} from 'react-icons/gr';
import {useRouter} from 'next/navigation';
import restApi from "@/app/resources/js/Axios";
import {getSession} from "@/app/resources/js/Session";

export default function DetailPage () {
    const router = useRouter();
    const [url,setUrl] = useState("")
    const [activeTab,setActiveTab] = useState("중복제거 칼럼 설정");
    const [blockIpList,setBlockIpList] = useState([]);
    const [blockKeywordList,setBlockKeywordList] = useState([]);
    const [duplColumnInfo,setDuplColumnInfo] = useState([]);
    const [keyList,setKeyList] = useState([])
    const [landingInfo,setLandingInfo] = useState({head: null,description: null,body: null,title: null});
    const [landingMappingInfoList,setLandingMappingInfoList] = useState()
    const [urlList,setUrlList] = useState([])
    const [ipModalOpen,setIpModalOpen] = useState(false)
    const [ip,setIp] = useState("")
    const [keyword,setKeyword] = useState("")
    const [copyTargetDbCode,setCopyTargetDbCode] = useState("")
    const [duplModalOpen,setDuplModalOpen] = useState("off")
    const [duplData,setDuplData] = useState({keyGroup: 0,duplColumn: [],preprocessing: false,postprocessing: false});
    const code = useRef("");

    const handlePageInfoSave = () => {
        try {
            restApi('post','/custDb/pageInfo/save',{
                dbCode: code.current,
                head: landingInfo.head,
                body: landingInfo.body,
                title: landingInfo.title,
                description: landingInfo.description,
            }).then(response => {
                // @ts-ignore
                if (response.status === 200) {
                    alert("저장되었습니다.");
                    const queryParams = new URLSearchParams(window.location.search);
                    const id = queryParams.get('id');
                    if (!!id) {
                        getData(id);
                        setDuplModalOpen("off");
                    }
                } else {
                    alert(response.data);
                }
            })
        } catch (error) {
            // @ts-ignore
            router.push('/' + getSession("companyName") + '/login');
        }
    }

    const handleDuplCheckDelete = () => {
        try {
            restApi('post','/custDb/duplCheck/delete',{
                keyGroup: duplData.keyGroup,dbCode: code.current,
            }).then(response => {
                // @ts-ignore
                if (response.status === 200) {
                    alert("삭제가 완료되었습니다.");
                    const queryParams = new URLSearchParams(window.location.search);
                    const id = queryParams.get('id');
                    if (!!id) {
                        getData(id);
                        setDuplModalOpen("off");
                    }
                } else {
                    alert(response.data);
                }
            })
        } catch (error) {
            // @ts-ignore
            router.push('/' + getSession("companyName") + '/login');
        }
    }

    const handleDuplCheckModify = () => {
        try {
            restApi('post','/custDb/duplCheck/modify',{
                keyGroup: duplData.keyGroup,
                dbCode: code.current,
                keyList: duplData.duplColumn,
                preprocessingYn: duplData.preprocessing,
                postprocessingYn: duplData.postprocessing
            }).then(response => {
                // @ts-ignore
                if (response.status === 200) {
                    alert("수정이 완료되었습니다.");
                    const queryParams = new URLSearchParams(window.location.search);
                    const id = queryParams.get('id');
                    if (!!id) {
                        getData(id);
                        setDuplModalOpen("off");
                    }
                } else {
                    alert(response.data);
                }
            })
        } catch (error) {
            // @ts-ignore
            router.push('/' + getSession("companyName") + '/login');
        }
    }

    const handleDuplCheckCreate = () => {
        if (duplData.duplColumn.length === 0) {
            alert("중북제거 칼럼을 선택해주세요.");
            return;
        }
        if (!duplData.preprocessing && !duplData.postprocessing) {
            alert("처리프로세스 중 한가지 이상 선택해주세요.");
            return;
        }

        const combinedKeyList = duplData.duplColumn.sort().join(', ');
        let check = false;

        duplColumnInfo.forEach(dupl => {
            // @ts-ignore
            const combinedInfo = dupl.infoList.sort().join(', ');
            if (combinedKeyList === combinedInfo) {
                check = true;
            }
        });

        if (check) {
            alert("이미 등록된 칼럼목록입니다. 수정화면에서 진행해주세요");
            return null;
        }

        try {
            restApi('post','/custDb/duplCheck/create',{
                dbCode: code.current,
                keyList: duplData.duplColumn,
                preprocessingYn: duplData.preprocessing,
                postprocessingYn: duplData.postprocessing
            }).then(response => {
                // @ts-ignore
                if (response.status === 200) {
                    alert("생성이 완료되었습니다.");
                    const queryParams = new URLSearchParams(window.location.search);
                    const id = queryParams.get('id');
                    if (!!id) {
                        getData(id);
                        setDuplModalOpen("off");
                    }
                } else {
                    alert(response.data);
                }
            })
        } catch (error) {
            // @ts-ignore
            router.push('/' + getSession("companyName") + '/login');
        }
    }

    const handleCreateKeyword = () => {
        if (keyword === "") {
            alert("키워드를 입력해주세요.")
            return null;
        } else {
            // @ts-ignore
            if (blockKeywordList.includes(keyword)) {
                alert("이미 차단된 키워드입니다.")
                return null;
            }
        }

        try {
            restApi('post','/custDb/blockedKeyword/create',{
                dbCode: code.current,keyword: keyword
            }).then(response => {
                // @ts-ignore
                if (response.status === 200) {
                    alert("생성이 완료되었습니다.");
                    const queryParams = new URLSearchParams(window.location.search);
                    const id = queryParams.get('id');
                    if (!!id) {
                        getData(id);
                    }
                } else {
                    alert(response.data);
                }
            })
        } catch (error) {
            // @ts-ignore
            router.push('/' + getSession("companyName") + '/login');
        }
    }

    const handleDeleteKeyword = (keywordStr : any) => {
        try {
            restApi('post','/custDb/blockedKeyword/delete',{
                dbCode: code.current,keyword: keywordStr
            }).then(response => {
                // @ts-ignore
                if (response.status === 200) {
                    alert("삭제가 완료되었습니다.");
                    const queryParams = new URLSearchParams(window.location.search);
                    const id = queryParams.get('id');
                    if (!!id) {
                        getData(id);
                    }
                } else {
                    alert(response.data);
                }
            })
        } catch (error) {
            // @ts-ignore
            router.push('/' + getSession("companyName") + '/login');
        }
    }

    const handleCopyBlockedIp = () => {
        try {
            restApi('post','/custDb/blockedIp/copy',{
                targetDbCode: copyTargetDbCode,applyDbCode: code.current
            }).then(response => {
                // @ts-ignore
                if (response.status === 200) {
                    alert(`총 ${response.data.copyCnt + response.data.duplCnt} 건 중, ${response.data.duplCnt} 건 중복, ${response.data.copyCnt} 건 복사가 완료되었습니다.`);
                    const queryParams = new URLSearchParams(window.location.search);
                    const id = queryParams.get('id');
                    if (!!id) {
                        getData(id);
                        setIpModalOpen(false);
                    }
                } else {
                    alert(response.data);
                }
            })
        } catch (error) {
            // @ts-ignore
            router.push('/' + getSession("companyName") + '/login');
        }
    }

    const handleCreateIp = () => {
        if (ip === "") {
            alert("ip를 입력해주세요.")
            return null;
        } else {
            // @ts-ignore
            if (blockIpList.includes(ip)) {
                alert("이미 차단된 IP입니다.")
                return null;
            }
        }

        try {
            restApi('post','/custDb/blockedIp/create',{
                dbCode: code.current,ip: ip
            }).then(response => {
                // @ts-ignore
                if (response.status === 200) {
                    alert("생성이 완료되었습니다.");
                    const queryParams = new URLSearchParams(window.location.search);
                    const id = queryParams.get('id');
                    if (!!id) {
                        getData(id);
                    }
                } else {
                    alert(response.data);
                }
            })
        } catch (error) {
            // @ts-ignore
            router.push('/' + getSession("companyName") + '/login');
        }
    }

    const handleDeleteIp = (ipStr : any) => {
        try {
            restApi('post','/custDb/blockedIp/delete',{
                dbCode: code.current,ip: ipStr
            }).then(response => {
                // @ts-ignore
                if (response.status === 200) {
                    alert("삭제가 완료되었습니다.");
                    const queryParams = new URLSearchParams(window.location.search);
                    const id = queryParams.get('id');
                    if (!!id) {
                        getData(id);
                    }
                } else {
                    alert(response.data);
                }
            })
        } catch (error) {
            // @ts-ignore
            router.push('/' + getSession("companyName") + '/login');
        }
    }

    const getData = (id : any) => {
        try {
            restApi('get','/custDb/lpge/info',{
                idx: id,companyId: getSession("companyIdx")
            }).then(response => {
                // @ts-ignore
                if (response.status === 200) {
                    code.current = response.data.code;
                    setUrl(response.data.url);
                    setBlockIpList(response.data.blockIpList);
                    setBlockKeywordList(response.data.blockKeywordList);
                    setDuplColumnInfo(response.data.duplColumnInfo.duplRemover);
                    setKeyList(response.data.duplColumnInfo.keyList);
                    setLandingInfo(response.data.landingInfo);
                    setLandingMappingInfoList(response.data.landingMappingInfoList);
                } else {
                    alert(response.data);
                }
            })
        } catch (error) {
            // @ts-ignore
            router.push('/' + getSession("companyName") + '/login');
        }
    }

    useEffect(() => {
        if (duplModalOpen === "off") {
            setDuplData({keyGroup: 0,duplColumn: [],preprocessing: false,postprocessing: false});
        }
    },[duplModalOpen]);

    useEffect(() => {
        if (ipModalOpen) {
            try {
                restApi('get','/custDb/lpge/list',{}).then(response => {
                    // @ts-ignore
                    if (response.status === 200) {
                        setUrlList(response.data.dataList);
                    } else {
                        alert(response.data);
                    }
                })
            } catch (error) {
                // @ts-ignore
                router.push('/' + getSession("companyName") + '/login');
            }
        }
    },[ipModalOpen]);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('id');
        if (!!id) {
            getData(id);
        }
    },[]);

    const renderTabContent = () => {
        switch (activeTab) {
            case "중복제거 칼럼 설정":
                return (<div className="duplication">
                    <h4>중복제거 칼럼 설정</h4>
                    <ul className="duplication_list">
                        {duplColumnInfo?.map((dupl,index) => {
                            // @ts-ignore
                            const combinedInfo = dupl.infoList.join(', ');
                            return (<li key={index}>
                                        <span onDoubleClick={(event) => {
                                            // @ts-ignore
                                            setDuplData({
                                                keyGroup: dupl.keyGroup,
                                                duplColumn: dupl.infoList,
                                                preprocessing: dupl.prePrc,
                                                postprocessing: dupl.postPrc
                                            })
                                            setDuplModalOpen("M");
                                        }}>{combinedInfo}</span>
                            </li>);
                        })}
                    </ul>
                    <div className="btn_box">
                        <button type="button" className="type1" onClick={(event) => setDuplModalOpen("C")}>신규
                        </button>
                    </div>
                </div>);
            case "IP차단":
                return (<div className="ip">
                    <h4>IP차단 목록</h4>
                    <div className="input_box">
                        <input type="text" placeholder="ip" value={ip}
                               onChange={(event) => setIp(event.target.value)}/>
                        <button type="button" className="type1" onClick={(event) => handleCreateIp()}>생성</button>
                        <button type="button" className="type2" onClick={(event) => setIpModalOpen(true)}>일괄복사
                        </button>
                    </div>
                    <ul className="ip_list">
                        {blockIpList.map((ipStr,index) => {
                            if (ip !== "") {
                                // @ts-ignore
                                if (!ipStr.includes(ip)) {
                                    return null;
                                }
                            }
                            return (<li key={index}>
                                <span>{ipStr}</span>
                                <GrClose size="10" onClick={event => handleDeleteIp(ipStr)}/>
                            </li>)
                        })}
                    </ul>
                </div>);
            case "키워드차단":
                return (<div className="keyword">
                    <h4>키워드 차단 목록</h4>
                    <div className="input_box">
                        <input type="text" placeholder="키워드를 입력하세요" value={keyword}
                               onChange={(event) => setKeyword(event.target.value)}/>
                        <button type="button" className="type1" onClick={(event) => handleCreateKeyword()}>생성
                        </button>
                    </div>
                    <ul className="keyword_list">
                        {blockKeywordList.map((keywordStr,index) => {
                            if (keyword !== "") {
                                // @ts-ignore
                                if (!keywordStr.includes(keyword)) {
                                    return null;
                                }
                            }
                            return (<li key={index}>
                                <span>{keywordStr}</span>
                                <GrClose size="10" onClick={event => handleDeleteKeyword(keywordStr)}/>
                            </li>)
                        })}
                    </ul>
                </div>);
            case "페이지설정":
                return (<div className="pagesetting">
                    <h4>페이지 설정</h4>
                    <ul className="pagesetting_list">
                        <li>
                            <p>title</p>
                            <input type="text" placeholder="title"
                                   value={landingInfo.title === null ? "" : landingInfo.title}
                                   onChange={(event) => {
                                       event.target.style.height = 'auto';
                                       event.target.style.height = `${event.target.scrollHeight}px`;
                                       // @ts-ignore
                                       setLandingInfo({...landingInfo,title: event.target.value})
                                   }}/>
                        </li>
                        <li>
                            <p>description</p>
                            <textarea name="" id=""
                                      value={landingInfo.description === null ? "" : landingInfo.description}
                                      onChange={(event) => {
                                          event.target.style.height = 'auto';
                                          event.target.style.height = `${event.target.scrollHeight}px`;
                                          // @ts-ignore
                                          setLandingInfo({...landingInfo,description: event.target.value})
                                      }}/>
                        </li>
                        <li>
                            <p>head</p>
                            <textarea name="" id="" value={landingInfo.head === null ? "" : landingInfo.head}
                                      onChange={(event) => {
                                          event.target.style.height = 'auto';
                                          event.target.style.height = `${event.target.scrollHeight}px`;
                                          // @ts-ignore
                                          setLandingInfo({...landingInfo,head: event.target.value})
                                      }}/>
                        </li>
                        <li>
                            <p>body</p>
                            <textarea name="" id="" value={landingInfo.body === null ? "" : landingInfo.body}
                                      onChange={(event) => {
                                          event.target.style.height = 'auto';
                                          event.target.style.height = `${event.target.scrollHeight}px`;
                                          // @ts-ignore
                                          setLandingInfo({...landingInfo,head: event.target.value})
                                      }}/>
                        </li>
                    </ul>
                    <div className="btn_box">
                        <button type="button" className="type1" onClick={(event) => handlePageInfoSave()}>저장
                        </button>
                    </div>
                </div>)

            default:
                return null;
        }
    };

    return (<CommonLayout>
        {ipModalOpen && (<div className="modal">
            <div className="modal_wrap copy_ver">
                <div className="modal_header">
                    <span>IP차단 목록 복사</span>
                    <GrClose size="22" onClick={(event) => setIpModalOpen(false)}/>
                </div>
                <div>
                    <select name="" id="dbList" onChange={(event) => setCopyTargetDbCode(event.target.value)}>
                        {urlList.map((url,index) => {
                            // @ts-ignore
                            if (code.current === url?.dbCode) {
                                return null;
                            }
                            return ( // @ts-ignore
                                <option key={index} value={url?.dbCode}>{url?.url}</option>);
                        })}
                    </select>
                    <button type="button" className="type1" onClick={(event) => handleCopyBlockedIp()}>확인
                    </button>
                </div>
            </div>
            <div className="modal_bg"></div>
        </div>)}
        {duplModalOpen !== "off" && (<div className="modal">
            <div className="modal_wrap copy_ver2">
                <div className="modal_header">
                    <span>중복제거 정보</span>
                    <GrClose size="22" onClick={(event) => setDuplModalOpen("off")}/>
                </div>
                <div className="modal_body">
                    <div className="left">
                        <p>컬럼정보</p>
                        <ul>
                            {keyList.map((key,index) => (<li key={index}>
                                <input type="checkbox" name="duplKey" value={key}
                                       checked={duplData.duplColumn.includes(key)}
                                       onChange={(event) => {
                                           const {value,checked} = event.target;
                                           setDuplData((prevState : any) => {
                                               const duplColumn = checked ? [...prevState.duplColumn,value] : prevState.duplColumn.filter((item : any) => item !== value);

                                               return {...prevState,duplColumn};
                                           });
                                       }}/>
                                <p>{key}</p>
                            </li>))}
                        </ul>
                    </div>
                    <div className="right">
                        <p>처리 프로세스</p>
                        <ul>
                            <li>
                                <input type="checkbox" name="preprocessing" value="preprocessing"
                                       checked={duplData.preprocessing}
                                       onChange={(event) => setDuplData({
                                           ...duplData,[event.target.name]: event.target.checked,
                                       })}/>
                                <p>전처리</p>
                            </li>
                            <li>
                                <input type="checkbox" name="postprocessing" value="postprocessing"
                                       checked={duplData.postprocessing}
                                       onChange={(event) => setDuplData({
                                           ...duplData,[event.target.name]: event.target.checked,
                                       })}/>
                                <p>후처리</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="modal_foot">
                    <div className="btn_box">
                        {duplModalOpen === "M" && (<>
                            <button type="button" className="type1"
                                    onClick={(event) => handleDuplCheckModify()}>수정
                            </button>
                            <button type="button" className="type3"
                                    onClick={(event) => handleDuplCheckDelete()}>삭제
                            </button>
                        </>)}
                        {duplModalOpen === "C" && (<button type="button" className="type1" onClick={(event) => {
                            handleDuplCheckCreate()
                        }}>생성</button>)}
                    </div>
                </div>
            </div>
            <div className="modal_bg"></div>
        </div>)}

        {/* modal end */}
        <div className="landing_detail_wrap">
            <div className="title_box">
                <h2>랜딩 페이지 상세정보- {url}</h2>
            </div>
            <section className="tab_wrap">
                <ul className="tab_menu">
                    {["중복제거 칼럼 설정","IP차단","키워드차단","페이지설정"].map((tab) => (<li
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={activeTab === tab ? "on" : ""}
                    >
                        {tab}
                    </li>))}
                </ul>
                <div className="tab_value">
                    {renderTabContent()}
                </div>
            </section>
        </div>
    </CommonLayout>);
}
