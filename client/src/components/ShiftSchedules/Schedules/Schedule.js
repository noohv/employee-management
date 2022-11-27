import React, { useEffect, useState } from 'react'
import Popup from "../../Reusable/Popup";
import { Button, Container, TableBody, TableCell, TableRow, IconButton, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useDispatch, useSelector } from "react-redux";
import { getSchedule } from "../../../actions/schedule";
import { getEmployees } from "../../../actions/employees";
import { useParams, useNavigate } from 'react-router-dom';
import useTable from '../../Reusable/useTable';
import ShiftForm from '../Shifts/ShiftForm'
import ShiftSelect from './ShiftSelect';

export default function Schedules() {
  const initialData = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
  }
  const [filter, setFilter] = useState({ fn: items => { return items } })
  const [openPopup, setOpenPopup] = useState(false)
  const { schedule }  = useSelector((state) => state.schedule)
  const employees = useSelector((state) => state.employees.data)
  const [editing, setEditing] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let { id } = useParams()  
  const [shift, setShift] = useState(initialData)
  

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(shift)
    setShift(initialData) 

  } 

  const handleChange = (e, day) => {
    const { value } = e.target
    setShift({...shift, [day]: typeof value === 'string' ? value.split(',') : value })
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
    { id: 'edit', label: 'Rediģēt', disableSorting: true }
  ]

  useEffect(() => {
    dispatch(getSchedule(id))
    dispatch(getEmployees())
    document.title = "Grafiks"
  }, [])
  
  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  } = useTable(schedule.employeeSchedules, headCells, filter)
  
  return (
    <>
      <IconButton onClick={()=> navigate(-1)}><ArrowBackRoundedIcon /></IconButton>
      <Container>
        <Button
          sx={{mt:5, mb: 2, ml:3}}
          variant='contained'
          size='large'
          onClick={() => { setOpenPopup(true) }}>Rediģēt
        </Button>
        <TblContainer>
          <TblHead />
          <TableBody>
            {
              recordsAfterPagingAndSorting().map(item => {
                const emp = employees.find(i => i?._id === item.employee?._id )
                const checkDate = (day) => {
                  return emp?.absences.find(i => i.startDate <= day.toISOString() && i.endDate >= day.toISOString())?.absenceType
                }
                return (
                  <TableRow key={item._id}>
                    <TableCell>{ item.employee?.firstName ? `${item.employee?.firstName} ${item.employee?.lastName}` : `Dzēsts Darbinieks` }</TableCell>
                    <TableCell>
                      {
                        editing === item._id ? 
                          (
                            checkDate(dayDates.monday) ? <Chip label={checkDate(dayDates.monday)} /> :
                            <ShiftSelect day={"monday"} shifts={schedule.shifts} shift={shift} handleChange={handleChange} />
                          ) :
                          (checkDate(dayDates.monday) ? <Chip label={checkDate(dayDates.monday)}/> : "")
                      }
                    </TableCell>
                    <TableCell>
                    {
                        editing === item._id ? 
                          (
                            checkDate(dayDates.tuesday) ? <Chip label={checkDate(dayDates.tuesday)} /> :
                            <ShiftSelect day={"tuesday"} shifts={schedule.shifts} shift={shift} handleChange={handleChange} />
                          ) :
                          (checkDate(dayDates.tuesday) ? <Chip label={checkDate(dayDates.tuesday)}/> : "")
                      }
                    </TableCell>
                    <TableCell>
                      {
                        editing === item._id ? 
                          (
                            checkDate(dayDates.wednesday) ? <Chip label={checkDate(dayDates.wednesday)} /> :
                            <ShiftSelect day={"wednesday"} shifts={schedule.shifts} shift={shift} handleChange={handleChange} />
                          ) :
                          (checkDate(dayDates.wednesday) ? <Chip label={checkDate(dayDates.wednesday)}/> : "")
                      }
                    </TableCell>
                    <TableCell>
                      {
                        editing === item._id ? 
                          (
                            checkDate(dayDates.thursday) ? <Chip label={checkDate(dayDates.thursday)} /> :
                            <ShiftSelect day={"thursday"} shifts={schedule.shifts} shift={shift} handleChange={handleChange} />
                          ) :
                          (checkDate(dayDates.thursday) ? <Chip label={checkDate(dayDates.thursday)}/> : "")
                      }                        
                    </TableCell>
                    <TableCell>
                      {
                        editing === item._id ? 
                          (
                            checkDate(dayDates.friday) ? <Chip label={checkDate(dayDates.friday)} /> :
                            <ShiftSelect day={"friday"} shifts={schedule.shifts} shift={shift} handleChange={handleChange} />
                          ) :
                          (checkDate(dayDates.friday) ? <Chip label={checkDate(dayDates.friday)}/> : "")
                      }
                    </TableCell>
                    <TableCell>
                      {
                        editing === item._id ? 
                          (
                            checkDate(dayDates.saturday) ? <Chip label={checkDate(dayDates.saturday)} /> :
                            <ShiftSelect day={"saturday"} shifts={schedule.shifts} shift={shift} handleChange={handleChange} />
                          ) :
                          (checkDate(dayDates.saturday) ? <Chip label={checkDate(dayDates.saturday)}/> : "")
                      }
                    </TableCell>
                    <TableCell>
                      {
                        editing === item._id ? 
                          (
                            checkDate(dayDates.sunday) ? <Chip label={checkDate(dayDates.sunday)} /> :
                            <ShiftSelect day={"sunday"} shifts={schedule.shifts} shift={shift} handleChange={handleChange} />
                          ) :
                          (checkDate(dayDates.sunday) ? <Chip label={checkDate(dayDates.sunday)}/> : "")
                      }
                    </TableCell>
                    <TableCell>
                      {
                        editing === item._id ? 
                          <>
                            <IconButton onClick={(e) => {
                              setEditing(null)
                              handleSubmit(e)
                            }}>
                              <DoneIcon />
                            </IconButton> 
                            <IconButton onClick={() => {
                              setEditing(null)
                              setShift(initialData) 
                            }}>
                              <CloseIcon />
                            </IconButton> 
                          </>
                        : item.employee?.firstName ?
                            <IconButton onClick={() => setEditing(item._id)}>
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
        <TblPagination />
        <Popup
          title="Rediģēt grafiku"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <ShiftForm setOpenPopup={setOpenPopup} />
        </Popup>
      </Container>
    </>
  )
}

