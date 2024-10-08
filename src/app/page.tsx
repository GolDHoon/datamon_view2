"use client"
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { IoIosArrowForward } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { CgSearch } from "react-icons/cg";
import { FaListUl } from "react-icons/fa6";
import { FaListCheck } from "react-icons/fa6";
import { HiOutlineClipboardList } from "react-icons/hi";
import { PiUserListBold } from "react-icons/pi";
import { RiAccountCircleFill } from "react-icons/ri";





function MyCalendar() {
  const [value, setValue] = useState(new Date());

  // 스케줄 데이터 예시
  const scheduleData = {
    '2024-09-26': ['Meeting at 10 AM', 'Lunch at 1 PM'],
    '2024-09-27': ['Project Deadline', 'Team Sync at 2 PM'],
  };

  // tileContent를 이용한 타일 커스텀
  const renderTileContent = ({ date, view }: { date: Date; view: 'month' | 'year' | 'decade' | 'century' }) => {
    const dateStr = date.toISOString().split('T')[0]; // yyyy-mm-dd 형식으로 변환
    const events = scheduleData[dateStr]; // 해당 날짜의 이벤트 불러오기
  
    if (events) {
      return (
        <ul>
          {events.map((event, index) => (
            <li key={index}>{event}</li>
          ))}
        </ul>
      );
    }
    return null;
  };

  return (
    <div>
      <Calendar
        onChange={setValue}
        value={value}
        tileContent={renderTileContent} 
      />

<IoIosArrowForward />
<MdKeyboardArrowDown />
<MdOutlineArrowDropDown />
<IoIosSearch />
<IoSearch />
<CgSearch />
<FaListUl />
<FaListCheck />
<HiOutlineClipboardList />
<PiUserListBold />
< RiAccountCircleFill />
    </div>
  );
}

export default MyCalendar;
