import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import * as locales from 'react-date-range/dist/locale';
import { DateRange } from 'react-date-range';
import { Button, Container, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { createSchedule } from "../../../actions/schedule";

export default function ScheduleForm({ setOpenPopup }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    shiftCount: 0,
    dates: [{
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }]
  })

  const handleSubmit = (e) => {
    dispatch(createSchedule(formData))
    e.preventDefault();
    setOpenPopup(false);
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSelect = (ranges) => {
    console.log(ranges.selection.startDate.toISOString())
    setFormData({...formData, dates: [ranges.selection]})
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Container sx={{ display: 'flex', flexDirection:'column', justifyContent: 'center'}}>
          <DateRange
            editableDateInputs={false}
            // onChange={item => setFormData({...formData, dates: [item.selection]})}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            ranges={formData.dates}
            locale={locales.lv}
            minDate={new Date()}
          />
          <FormControl sx={{mt:1}}>
            <FormLabel id="radio-label">Maiņu skaits</FormLabel>
            <RadioGroup
              sx={{ display: 'flex', justifyContent: 'center' }}
              aria-labelledby="radio-label"
              name="radio-buttons-group"
              row
              value={formData.shiftCount}
              onChange={handleChange}
            >
              <FormControlLabel name="shiftCount" value="1" control={<Radio required />} label="Viena" />
              <FormControlLabel name="shiftCount" value="2" control={<Radio required />} label="Divas" />
              <FormControlLabel name="shiftCount" value="3" control={<Radio required />} label="Trīs" />
            </RadioGroup>
          </FormControl>
          <Button sx={{mt:4}} variant="contained" color="primary" size="large" type="submit" fullWidth>Izveidot</Button>
        </Container>
      </form>
    </>
  )
}
