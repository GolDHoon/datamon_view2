'use client';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';

const DateRangePicker = () => {
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());

    const handleDateChange = (dates: [Date, Date]) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    return (
        <div>
            <DatePicker
                selectsRange
                startDate={startDate}
                endDate={endDate}
                onChange={event => {console.log(event)}}
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