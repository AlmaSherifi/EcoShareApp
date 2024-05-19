// components/Calendar.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './calendar.module.css'; 

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className={styles.calendarContainer}>
      <DatePicker
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        open={true}
      />
    </div>
  );
};

export default Calendar;
