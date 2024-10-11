'use client';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  return (
      <div>
        <DatePicker
          selectsRange
          // startDate={startDate}
          // endDate={endDate}

          dateFormat="yyyy/MM/dd"
          placeholderText="yyyy-mm-dd"
          // 년도 및 월 선택
          showYearDropdown
          showMonthDropdown
          dropdownMode="select"
        />
      </div>
  );
};

export default DateRangePicker;
