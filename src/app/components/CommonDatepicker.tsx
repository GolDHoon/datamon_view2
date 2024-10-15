'use client';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
//import dayjs from 'dayjs';
import { ko } from 'date-fns/locale';

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  return (
      <div>
         <DatePicker
              selectsRange
              startDate={startDate}
              endDate={endDate}
           //   onChange={handleDateChange}
              dateFormat="yyyy/MM/dd"
              placeholderText="yyyy-mm-dd"
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
              locale={ko}
          />
      </div>
  );
};

export default DateRangePicker;
