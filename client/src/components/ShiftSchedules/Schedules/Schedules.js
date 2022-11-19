import React, { useEffect, useState } from 'react'
import ScheduleForm from './ScheduleForm'
import Popup from "../../Reusable/Popup";
import { Button, Container } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { getSchedules } from "../../../actions/schedule";

export default function Schedules() {
  const [openPopup, setOpenPopup] = useState(false)
  const schedules = useSelector((state) => state.schedule.data)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getSchedules())
  }, [])

  return (
    <>
      <Button onClick={() => { setOpenPopup(true) }}>Pievienot</Button>

      {schedules.map(item => {
        return (
          <Container key={item._id}>
            {item.startDate}
            {item.endDate}
            {item.shiftCount}
          </Container>
        )})}

      <Popup
        title="Grafika laika posms"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ScheduleForm setOpenPopup={setOpenPopup} />
      </Popup>
    </>
  )
}
