import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import * as locales from 'react-date-range/dist/locale';
import { DateRange } from 'react-date-range';
import { Button } from '@mui/material';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export default function ScheduleForm({ setOpenPopup }) {
    const [dates, setDates] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    }]);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        // dispatch(createAbsence(id,absenceData));
        setOpenPopup(false);
    }

    console.log(dates[0].startDate.toISOString())

  return (
    <>
        <form onSubmit={handleSubmit}>
            <DateRange
                editableDateInputs={false}
                onChange={item => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                locale={locales.lv}
            />
            <Button sx={{m:0.5}} variant="contained" color="primary" size="large" type="submit" fullWidth>Izveidot</Button>
        </form>
    </>
  )
}
