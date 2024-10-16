'use client'
import React, { useState } from 'react';
import { FaRegNoteSticky } from "react-icons/fa6";
import { FaMarker } from "react-icons/fa";
import { PiUserListBold } from "react-icons/pi";
import { TbBeta } from "react-icons/tb";
import { RiCustomerService2Fill } from "react-icons/ri";
import { BsArrowLeftShort } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { MdManageSearch } from "react-icons/md";
import Link from 'next/link'
import "../../resources/scss/main/sidebar.scss";

export default function Sidebar(){
    const [isActive1, setIsActive1] = useState(false);
    const [isActive2, setIsActive2] = useState(false);
    const [isActive3, setIsActive3] = useState(false);
    const [isActive4, setIsActive4] = useState(false);
    const [isActive6, setIsActive6] = useState(false);

    return (
<nav className={ isActive1 ? 'min' : ''}>
<h1><Link href="/home">DATAMON</Link></h1>
<i className="right_toggle" onClick={() => setIsActive1(!isActive1)}><BsArrowLeftShort color="fff" size="26" />arrow</i>
<div className="nav_wrap">
    <ul className="gnb">
        <li className="mli" > <FaRegNoteSticky size="20" /> 공지사항 
</li>
        <li className={`mli ${isActive2 ? 'on' : ''}`}   onClick={() => setIsActive2(!isActive2)} ><FaMarker  size="20" /> 마스터 계정 관리 <IoIosArrowDown />
            <ul>
                <li> <Link href="/">공지사항 관리</Link></li>
                <li> <Link href="/">문의 관리</Link></li>
                <li>홍보페이지 관리</li>
            </ul>
        </li>
        <li className={`mli ${isActive3 ? 'on' : ''}`}      onClick={() => setIsActive3(!isActive3)} > <PiUserListBold  size="20" />사용자 관리 <IoIosArrowDown />

            <ul>
                <li>마스터 계정 승인</li>
                <li>계정 승인</li>
                <li>마스터 계정 목록</li>
                <li>사용자 계정 목록</li>
                <li>고객DB 매핑 요청 승인</li>
            </ul>
        </li>
        <li className={`mli ${isActive6 ? 'on' : ''}`}     onClick={() => setIsActive6(!isActive6)} > <MdManageSearch  size="20" /> 고객정보 목록 <IoIosArrowDown />
<ul>
    <li><Link href="/ad/custInfo/">고객정보 목록</Link></li>
    {/* <li>고객DB별 이력</li>
    <li>고객DB 삭제</li> */}
</ul>
</li>
        <li className={`mli ${isActive4 ? 'on' : ''}`}     onClick={() => setIsActive4(!isActive4)} > <TbBeta  size="20" /> Beta기능 <IoIosArrowDown />

            <ul>
                <li>광고플랫폼 DB관리</li>
            </ul>
        </li>
        <li className="mli"> <RiCustomerService2Fill  size="20" />고객센터</li>
    </ul>
</div>
</nav>
    )
}