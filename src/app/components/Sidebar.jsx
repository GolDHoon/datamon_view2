'use client'
import React, { useState } from 'react';
import { FaRegNoteSticky } from "react-icons/fa6";
import { FaMarker } from "react-icons/fa";
import { PiUserListBold } from "react-icons/pi";
import { TbBeta } from "react-icons/tb";
import { RiCustomerService2Fill } from "react-icons/ri";
import { BsArrowLeftShort } from "react-icons/bs";
import "../resources/scss/main/sidebar.scss";

export default function Sidebar(){
    const [isActive1, setIsActive1] = useState(false);
    const [isActive2, setIsActive2] = useState(false);
    const [isActive3, setIsActive3] = useState(false);
    const [isActive4, setIsActive4] = useState(false);

    return (
<nav className={ isActive1 ? 'min' : ''}>
<h1>DATAMON</h1>
<i className="right_toggle"  onClick={() => setIsActive1(!isActive1)}><BsArrowLeftShort color="fff" size="26" />arrow</i>
{/* <select>
    <option value="driven">www.driven.co.kr</option>
    <option value="">드리븐2</option>
    <option value="">드리븐3</option>
    <option value="">드리븐4</option>
</select> */}

<div className="nav_wrap">
    <ul className="gnb">
        <li className="mli" > <FaRegNoteSticky size="24" /> 공지사항</li>
        <li className={`mli ${isActive2 ? 'on' : ''}`}   onClick={() => setIsActive2(!isActive2)} ><FaMarker  size="24" /> 마스터 계정 관리
            <ul>
                <li>공지사항 관리</li>
                <li>문의 관리</li>
                <li>홍보페이지 관리</li>
            </ul>
        </li>
        <li className={`mli ${isActive3 ? 'on' : ''}`}      onClick={() => setIsActive3(!isActive3)} > <PiUserListBold  size="24" />사용자 관리
            <ul>
                <li>마스터 계정 승인</li>
                <li>계정 승인</li>
                <li>마스터 계정 목록</li>
                <li>사용자 계정 목록</li>
                <li>고객DB 매핑 요청 승인</li>
            </ul>
        </li>
        <li className={`mli ${isActive4 ? 'on' : ''}`}     onClick={() => setIsActive4(!isActive4)} > <TbBeta  size="24" /> Beta기능
            <ul>
                <li>광고플랫폼 DB관리</li>
            </ul>
        </li>
        <li className="mli"> <RiCustomerService2Fill  size="24" />고객센터</li>
    </ul>
</div>
</nav>
    )
}