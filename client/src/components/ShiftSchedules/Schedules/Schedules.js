import React, { useEffect, useState } from 'react'
import ScheduleForm from './ScheduleForm'
import Popup from "../../Reusable/Popup";
import { Button, Container } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { getSchedules } from "../../../actions/schedule";
import { ViewState } from '@devexpress/dx-react-scheduler';
import { Scheduler, MonthView, Toolbar, DateNavigator, Appointments, TodayButton } from '@devexpress/dx-react-scheduler-material-ui';
import { useNavigate } from 'react-router-dom';


const Appointment = ({ children, ...restProps }) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/grafiki/${restProps.data._id}`)
  }

  return (
    <Appointments.Appointment
      {...restProps}
      onClick={handleClick}
    >
      {children}
    </Appointments.Appointment>

  )
}


export default function Schedules() {
  const [openPopup, setOpenPopup] = useState(false)
  const schedules = useSelector((state) => state.schedule.data)
  const [currentDate, setCurrentDate] = useState(new Date())
  const dispatch = useDispatch()
  
  const localizationMessages = {
    'lv-LV': {
      today: 'Šodiena'
    }
  }

  useEffect(() => {
    dispatch(getSchedules())
  }, [])

  return (
    <Container>
      <Button
        sx={{mt:5, mb: 2, ml:3}}
        variant='contained'
        size='large'
        onClick={() => { setOpenPopup(true) }}>Pievienot</Button>
      <Container>
        <Scheduler
            data={schedules}
            firstDayOfWeek={1}
            locale='lv-LV'
            onAppointmentClick={()=>{console.log('test')}}
            >
            <ViewState
              defaultCurrentDate={currentDate}
              onClick={() => console.log('a')}
            />
            <MonthView />
            <Toolbar />
            <DateNavigator />
            <TodayButton 
              messages={localizationMessages['lv-LV']}
            />
            <Appointments
              appointmentComponent={Appointment}
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
    </Container>
  )
}

