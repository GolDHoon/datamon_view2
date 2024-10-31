'use client'
import CommonLayout from "@/app/components/layout/CommonLayout"
import { FaUserCircle } from "react-icons/fa";
import {getSession} from "@/app/resources/js/Session";
import { useState, useEffect } from "react";
import restApi from "@/app/resources/js/Axios";
import {userInfo} from "node:os";
import {router} from "next/client";
import {useRouter} from "next/navigation";

interface PageProps {
}

const Page: React.FC<PageProps> = () => {
    const router = useRouter();
    const [userKind, setUserKind] = useState("")
    const [userInfo, setUserInfo] = useState<{
        userId:string
        name:string
        role:string
        mail:string
        tel:string
        ceo:string
        brn:string
        address:string
        bizStatus:string
        bizKind:string
    }>({
        userId:"",
        name:"",
        role:"",
        mail:"",
        tel:"",
        ceo:"",
        brn:"",
        address:"",
        bizStatus:"",
        bizKind:"",
    })
    const [companyName, setCompanyName] = useState("")

    const adminGetData = ()=>{
        try{
            restApi('get', '/admin/', {}).then(response => {
                // @ts-ignore
                if (response.status === 200) {
                    setUserInfo({...userInfo,
                        userId: response.data.userId,
                        name: response.data.name,
                        ceo: response.data.ceo,
                        brn : response.data.corporateNumber,
                        address: response.data.corporateAddress,
                        mail: response.data.corporateMail,
                        bizStatus: response.data.businessStatus,
                        bizKind: response.data.businessItem})
                }
            })
        }catch (e){

        }
    }

    const handleModify = () => {
        if(userKind === "admin"){
            try {
                restApi('post', '/admin/reqAccount', {
                    requestType:"M",
                    userId: userInfo.userId,
                    name: userInfo.name,
                    userType: getSession("userType"),
                    ceo: userInfo.ceo,
                    corporateNumber: userInfo.brn,
                    corporateAddress: userInfo.address,
                    corporateMail: userInfo.mail,
                    businessStatus: userInfo.bizStatus,
                    businessItem: userInfo.bizKind,
                    requestReason: "마이페이지 - 고객정보 수정",
                }).then(response => {
                    // @ts-ignore
                    if(response.status === 200){
                        alert("수정신청이 완료되었습니다. 운영자 승인까지 기다려주세요.")
                        router.push(`/${getSession("companyId")}/login`)
                    }else{
                        alert(response.data.detailReason)
                    }
                })
            } catch (error){
                console.log(error)
            }
        }else{
            try {
                restApi('post', '/member/reqAccount', {
                    requestType:"M",
                    userId: userInfo.userId,
                    companyId: getSession("companyIdx"),
                    name: userInfo.name,
                    role: userInfo.role,
                    contactPhone: userInfo.tel,
                    contactMail: userInfo.mail,
                    requestReason: "마이페이지 - 고객정보 수정",
                }).then(response => {
                    // @ts-ignore
                    if(response.status === 200){
                        debugger;
                        alert("수정신청이 완료되었습니다. 관리자 승인까지 기다려주세요.")
                        router.push(`/${getSession("companyId")}/login`)
                    }else{
                        alert(response.data.detailReason)
                    }
                })
            } catch (error){
                console.log(error)
            }
        }
    }

    const handleDelete = () => {
        console.log("삭제클릭")

        if(userKind === "admin"){

        }else{

        }
        console.log(userInfo)
    }

    const memberGetData = () => {
        try{
            restApi('get', '/member/', {}).then(response => {
                // @ts-ignore
                if (response.status === 200) {
                    setUserInfo({...userInfo, userId: response.data.userId, name: response.data.name, role: response.data.role, mail: response.data.contactMail, tel: response.data.contactPhone})
                }
            })
        }catch (e){

        }
    }

    useEffect(() => {
        try {
            const tempUserType:string|null = getSession("userType")
            if(!!tempUserType){
                if(["USTY_MAST", "USTY_CLNT", "USTY_CLME", "USTY_CRAC"].includes(tempUserType)){
                    setUserKind("admin")
                    adminGetData()
                }else{
                    setUserKind("member")
                    memberGetData()
                }
                let tempCompanyName:string|null = getSession("companyName");
                if(!!tempCompanyName){
                    setCompanyName(tempCompanyName);
                }
            }
        }catch (e){

        }
    }, []);
    return(
        <CommonLayout>
            <div className="mypage_wrap">
                <div className="title_box">
                    <h2>마이페이지</h2>
                </div>
                {userKind !== "" && (
                    <>
                        {userKind === "member" && (
                            <div className="name">
                                <FaUserCircle color="999" size="30"/> <span>{companyName}</span>
                            </div>

                        )}
                        <section className="user_content">
                            <div>
                                <p>기본정보</p>
                                <ul>
                                    <li>
                                        <label htmlFor="">계&nbsp;&nbsp;&nbsp;&nbsp;정</label>
                                        <input type="text" disabled={true} value={userInfo.userId}
                                               onChange={(event) => setUserInfo({
                                                   ...userInfo,
                                                   userId: event.target.value
                                               })}/>
                                    </li>
                                    <li>
                                        <label htmlFor="">이메일</label>
                                        <div>
                                            <input type="text" disabled={true} value={userInfo.mail}
                                                   onChange={(event) => setUserInfo({
                                                       ...userInfo,
                                                       mail: event.target.value
                                                   })}/>
                                            <button type="button" className={"check"}>인증요청</button>
                                        </div>
                                    </li>
                                    {userKind === "member" && (
                                        <li>
                                            <label htmlFor="">연락처</label>
                                            <div>
                                                <input type="text" disabled={true} value={userInfo.tel}
                                                       onChange={(event) => setUserInfo({
                                                           ...userInfo,
                                                           tel: event.target.value
                                                       })}/>
                                                <button type="button" className={"check"}>인증요청</button>
                                            </div>
                                        </li>
                                    )}
                                </ul>
                                <div className={"btn_box"}>
                                    <button type="button" className="type2">패스워드 변경</button>
                                </div>
                            </div>

                            <div>
                                <p>상세 정보</p>
                                {userKind === "member" && (
                                    <ul>
                                        <li>
                                            <label htmlFor="">담당자</label><input type="text" value={userInfo.name}
                                                                                onChange={(event) => setUserInfo({
                                                                                    ...userInfo,
                                                                                    name: event.target.value
                                                                                })}/>
                                        </li>
                                        <li>
                                            <label htmlFor="">역&nbsp;&nbsp;&nbsp;&nbsp;할</label><input type="text"
                                                                                                       value={userInfo.role}
                                                                                                       onChange={(event) => setUserInfo({
                                                                                                           ...userInfo,
                                                                                                           role: event.target.value
                                                                                                       })}/>
                                        </li>
                                    </ul>
                                )}
                                {userKind === "admin" && (
                                    <ul>
                                        <li>
                                            <label htmlFor="">사&nbsp;&nbsp;업&nbsp;&nbsp;자<br/>등록번호</label><input type="text"
                                                                                    value={userInfo.brn}
                                                                                    onChange={(event) => setUserInfo({
                                                                                        ...userInfo,
                                                                                        brn: event.target.value
                                                                                    })}/>
                                        </li>
                                        <li>
                                            <label htmlFor="">업&nbsp;&nbsp;체&nbsp;&nbsp;명</label><input type="text" value={userInfo.name}
                                                                                onChange={(event) => setUserInfo({
                                                                                    ...userInfo,
                                                                                    name: event.target.value
                                                                                })}/>
                                        </li>
                                        <li>
                                            <label htmlFor="">대&nbsp;&nbsp;표&nbsp;&nbsp;자</label><input type="text"
                                                                                value={userInfo.ceo}
                                                                                onChange={(event) => setUserInfo({
                                                                                    ...userInfo,
                                                                                    ceo: event.target.value
                                                                                })}/>
                                        </li>
                                        <li>
                                            <label htmlFor="">소&nbsp;&nbsp;재&nbsp;&nbsp;지</label><input type="text"
                                                                                value={userInfo.address}
                                                                                onChange={(event) => setUserInfo({
                                                                                    ...userInfo,
                                                                                    address: event.target.value
                                                                                })}/>
                                        </li>
                                        <li>
                                            <label htmlFor="">업&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;태</label><input type="text"
                                                                               value={userInfo.bizStatus}
                                                                               onChange={(event) => setUserInfo({
                                                                                   ...userInfo,
                                                                                   bizStatus: event.target.value
                                                                               })}/>
                                        </li>
                                        <li>
                                            <label htmlFor="">업&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;종</label><input type="text"
                                                                               value={userInfo.bizKind}
                                                                               onChange={(event) => setUserInfo({
                                                                                   ...userInfo,
                                                                                   bizKind: event.target.value
                                                                               })}/>
                                        </li>
                                    </ul>
                                )}
                                <div className={"btn_box"}>
                                    <button type="button" className="type1" onClick={(evnet) => handleModify()}>수정</button>
                                    <button type="button" className="type3" onClick={(evnet) => handleDelete()}>회원탈퇴</button>
                                </div>
                            </div>
                        </section>
                    </>
                )}
            </div>
        </CommonLayout>

    )

}
export default Page;