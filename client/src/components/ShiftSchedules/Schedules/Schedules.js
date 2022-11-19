import React, { useEffect, useState } from 'react'
import ScheduleForm from './ScheduleForm'
import Popup from "../../Reusable/Popup";
import { Button, Container } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { getSchedules } from "../../../actions/schedule";
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  Toolbar,
  DateNavigator,
  Appointments,
  AppointmentTooltip,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';

export default function Schedules() {
  const [openPopup, setOpenPopup] = useState(false)
  const schedules = useSelector((state) => state.schedule.data)
  const [currentDate, setCurrentDate] = useState(new Date())
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getSchedules())
  }, [])

  return (
    <>
      <Button onClick={() => { setOpenPopup(true) }}>Pievienot</Button>


      <Container>
        <Scheduler
            data={schedules}
            firstDayOfWeek={1}
          >
            <ViewState
              defaultCurrentDate={currentDate}
            />
            <MonthView />
            <Toolbar />
            <DateNavigator />
            <TodayButton />
            <Appointments />
            <AppointmentTooltip
              showOpenButton
              showDeleteButton
            />
          </Scheduler>
      </Container>

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

