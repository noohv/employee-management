import React, { useState } from 'react'
import ScheduleForm from './ScheduleForm'
import Popup from "../../Reusable/Popup";
import { Button } from '@mui/material';


export default function Schedules() {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <>
      <Button 
        onClick={() => {
            setOpenPopup(true)
        }}
      >TEST</Button>


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
