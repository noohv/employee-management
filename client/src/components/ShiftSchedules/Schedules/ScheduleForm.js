import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import * as locales from 'react-date-range/dist/locale';
import { DateRange } from 'react-date-range';
import { Button, Container, FormControl, FormLabel, FormGroup, Checkbox, FormControlLabel } from '@mui/material';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { createSchedule } from "../../../actions/schedule";

export default function ScheduleForm({ setOpenPopup }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    shifts:{
      morning: false,
      evening: false,
      night: false
    },
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
    const { name, checked } = e.target
    setFormData({
      ...formData,
      shifts: {
        ...formData.shifts,
        [name]: checked
      }
    })
  }

  console.log(formData)

  const handleSelect = (ranges) => {
    setFormData({...formData, dates: [ranges.selection]})
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Container sx={{ display: 'flex', flexDirection:'column', justifyContent: 'center'}}>
          <DateRange
            editableDateInputs={false}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            ranges={formData.dates}
            locale={locales.lv}
            minDate={new Date()}
          />
          <FormControl sx={{mt:1}} component="fieldset" variant="standard">
            <FormLabel id="radio-label">Maiņu izvēle:</FormLabel>
            <FormGroup>
              <FormControlLabel name="shiftCount" value="1" control={
                <Checkbox checked={formData.shifts.one} onChange={handleChange} name="morning" />
              } label="Rīta" />
              <FormControlLabel name="shiftCount" value="1" control={
                <Checkbox checked={formData.shifts.two} onChange={handleChange} name="evening" />
              } label="Vakara" />
              <FormControlLabel name="shiftCount" value="1" control={
                <Checkbox checked={formData.shifts.three} onChange={handleChange} name="night" />
              } label="Nakts" />
            </FormGroup>
          </FormControl>
          <Button sx={{mt:4}} variant="contained" color="primary" size="large" type="submit" fullWidth>Izveidot</Button>
        </Container>
      </form>
    </>
  )
}
