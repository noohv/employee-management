import React, { useEffect, useState } from 'react'
import { Container, TableBody, TableCell, TableRow, IconButton, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useDispatch, useSelector } from "react-redux";
import { getSchedule, updateSchedule } from "../../../actions/schedule";
import { getEmployees } from "../../../actions/employees";
import { useParams, useNavigate } from 'react-router-dom';
import useTable from '../../Reusable/useTable';
import ShiftSelect from './ShiftSelect';

export default function Schedules() {
  const initialData = {
    id: '',
    employeeSchedules: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: []
    }
  }
  
  const [filter, setFilter] = useState({ fn: items => { return items } })
  const { schedule, success, error }  = useSelector((state) => state.schedule)
  const employees = useSelector((state) => state.employees.data)
  const [editing, setEditing] = useState(null)
  const [shift, setShift] = useState(initialData)
  const [currentId, setCurrentId] = useState('')
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let { id } = useParams()  

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(updateSchedule(id, editing, shift))

    setShift(initialData) 
    setEditing(null)
    setCurrentId('')
  } 
  
  const handleChange = (e, day) => {
    const { value } = e.target
    setShift({...shift, employeeSchedules: {...shift.employeeSchedules, [day]: typeof value === 'string' ? value.split(',') : value }})
  }

  const addDays = (days) => {
    if(schedule.startDate) {
      let result
      result = new Date(schedule.startDate)
      result.setDate(result.getDate() + days)
      return result
    }
    return new Date()
  }

  const dayDates = {
    monday: addDays(0),
    tuesday: addDays(1),
    wednesday: addDays(2),
    thursday: addDays(3),
    friday: addDays(4),
    saturday: addDays(5),
    sunday: addDays(6)
  }
  
  const headCells = [
    { id: 'fullName', label: 'Vārds Uzvārds', disableSorting: true },
    { id: 'monday', label: `Pirmdiena (${dayDates.monday.toISOString().slice(8,10)}/${dayDates.monday.toISOString().slice(5,7)})`, disableSorting: true },
    { id: 'tuesday', label: `Otrdiena (${dayDates.tuesday.toISOString().slice(8,10)}/${dayDates.tuesday.toISOString().slice(5,7)})`, disableSorting: true },
    { id: 'wednesday', label: `Trešdiena (${dayDates.wednesday.toISOString().slice(8,10)}/${dayDates.wednesday.toISOString().slice(5,7)})`, disableSorting: true },
    { id: 'thursday', label: `Ceturtdiena (${dayDates.thursday.toISOString().slice(8,10)}/${dayDates.thursday.toISOString().slice(5,7)})`, disableSorting: true },
    { id: 'friday', label: `Piektdiena (${dayDates.friday.toISOString().slice(8,10)}/${dayDates.friday.toISOString().slice(5,7)})`, disableSorting: true },
    { id: 'saturday', label: `Sestdiena (${dayDates.saturday.toISOString().slice(8,10)}/${dayDates.saturday.toISOString().slice(5,7)})`, disableSorting: true },
    { id: 'sunday', label: `Svētdiena (${dayDates.sunday.toISOString().slice(8,10)}/${dayDates.sunday.toISOString().slice(5,7)})`, disableSorting: true },
    { id: 'edit', label: '', disableSorting: true }
  ]

  useEffect(() => {
    dispatch(getSchedule(id))
    dispatch(getEmployees())

    if(currentId) {
      setShift({ id: currentId, employeeSchedules: schedule.employeeSchedules.find(i => i._id === currentId).days})
    }

    document.title = "Darba Grafiks"
    if(success || error) dispatch({type:'CLEAR_SCHEDULES_MESSAGE'})
  }, [currentId, success, error])
  
  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  } = useTable(schedule.employeeSchedules, headCells, filter)
  
  return (
    <>
      <IconButton sx={{mt:'1%', ml:'1%'}} onClick={()=> navigate(-1)}><ArrowBackRoundedIcon /></IconButton>
      <Container maxWidth='xl'>
        <form onSubmit={handleSubmit}>
          <TblContainer sx={{width:'max-content'}}>
            <TblHead />
            <TableBody >
              {
                recordsAfterPagingAndSorting().map(item => {
                  const emp = employees.find(i => i?._id === item.employee?._id )
                  const checkDate = (day) => {
                    return emp?.absences.find(i => i.startDate <= day.toISOString() && i.endDate >= day.toISOString())?.absenceType
                  }
                  return (
                    <TableRow key={item._id}>
                      <TableCell>{ item.employee?.firstName ? `${item.employee?.firstName} ${item.employee?.lastName}` : `Dzēsts Darbinieks` }</TableCell>
                      {
                        days.map(day => {
                          return (
                            <TableCell key={day}>
                              {
                                editing === item._id ? 
                                  (
                                    checkDate(dayDates[day]) ? 
                                      <Chip sx={{ m: 0.5 }} label={checkDate(dayDates[day]) === "vacation" ? "Atvaļinājumā" : checkDate(dayDates[day]) === "sick" ? "Slims" : "Cits iemesls"} /> :
                                      <ShiftSelect day={day} shifts={schedule.shifts} shift={shift.employeeSchedules} handleChange={handleChange} />
                                  ) :
                                  (
                                    checkDate(dayDates[day]) ? 
                                      <Chip sx={{ m: 0.5 }} label={checkDate(dayDates[day]) === "vacation" ? "Atvaļinājumā" : checkDate(dayDates[day]) === "sick" ? "Slims" : "Cits iemesls"} />  :
                                      schedule.employeeSchedules.find(i => i._id === item._id).days[day].map(j => (<Chip sx={{ m: 0.5 }} key={j} label={j} />))
                                  )
                              }
                            </TableCell>
                          )
                        })
                      }

                      <TableCell align="center">
                        {
                          editing === item._id ? 
                            <>
                              <IconButton type="submit">
                                <DoneIcon />
                              </IconButton> 
                              <IconButton onClick={() => {
                                setEditing(null)
                                setShift(initialData) 
                                setCurrentId('')
                              }}>
                                <CloseIcon />
                              </IconButton> 
                            </>
                          : item.employee?.firstName ?
                              <IconButton onClick={() => {
                                setEditing(item._id)
                                setShift({ ...shift, id: item._id }) 
                                setCurrentId(item._id)
                              }}>
                                <EditIcon />
                              </IconButton>
                            : ""
                        }
                      </TableCell>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </TblContainer>
        </form>
        <TblPagination />
      </Container>
    </>
  )
}
