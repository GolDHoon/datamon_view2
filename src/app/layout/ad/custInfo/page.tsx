import CommonLayout from "../../../components/layout/CommonLayout";
import CommonToggle from "@/app/components/CommonToggle";
import CommonDatepicker from "@/app/components/CommonDatepicker";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { IoIosArrowDown, IoIosClose } from "react-icons/io";
import { MdOutlineCalendarToday } from "react-icons/md";

export default function page (){
    return (
<CommonLayout>
<div className="custInfo_wrap">
<div className="title_box">
<h2>유저정보 리스트</h2>
<p>유저 정보 리스트 소개를 표시합니다.</p>
</div>

<div className="top_section">

<div className="filter">
{/* <button type="button" className="type1">탭 표시<IoIosArrowDown color="#fff" /></button> */}

<div className="search_filter">
<button type="button" className="type2">검색필터<IoIosArrowDown color="#fff" /></button>
<div className="output">
    <ul className="list">
        <li>이름</li>
        <li>날짜</li>
        <li>실비</li>
        <li>품질</li>
        <li>품질변경사유</li>
        <li>상태</li>
        <li>상태변경사유</li>
        <li>사용여부</li>
    </ul>
    <div className="filter_box check">
     {/* calendar type */}
     <div className="calendar_type">
<p>
<MdOutlineCalendarToday /> 날짜
</p>
<CommonDatepicker />
     </div>


{/* toggle type */}
<div className="toggle_type">
<ul>
    <li className="toggle_box"><span>옵션1</span><CommonToggle /> </li>
    <li className="toggle_box"><span>옵션2</span><CommonToggle /> </li>
    <li className="toggle_box"><span>옵션3</span><CommonToggle /> </li>
</ul>
</div>

{/* check type */}
<div className="check_type">
<ul>
    <li>
        <input type="checkbox" name="" id="1" /> <label htmlFor="1">체크리스트1</label>
    </li>
    <li> <input type="checkbox" name="" id="2" /> <label htmlFor="2">체크리스트1체크리스트1체크리스트1체크리스트1체크리스트1</label></li>
    <li> <input type="checkbox" name="" id="3" /> <label htmlFor="3">체크리스트1</label></li>
    <li> <input type="checkbox" name="" id="4" /> <label htmlFor="4">체크리스트1</label></li>
</ul>
</div>
    </div>
</div>
</div>

{/* <button type="button" className="excel"><PiMicrosoftExcelLogoFill color="#fff" /></button> */}
</div>

{/* <div className="tag_box">
    <button className="tag">ID <IoIosClose /></button>
<button className="tag">Country <IoIosClose /></button>
</div>
 */}
</div>

<section className="table">
{/* 여기에 테이블을 넣어주세요 */}
</section>
</div>
</CommonLayout>
    )
}