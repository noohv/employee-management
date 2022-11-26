import React, { useEffect, useState } from 'react'
import Popup from "../../Reusable/Popup";
import { Button, Container, TableBody, TableCell, TableRow, Toolbar, IconButton, Chip } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useDispatch, useSelector } from "react-redux";
import { getSchedule } from "../../../actions/schedule";
import { getEmployees } from "../../../actions/employees";
import { useParams, useNavigate } from 'react-router-dom';
import useTable from '../../Reusable/useTable';
import ShiftForm from '../Shifts/ShiftForm'

export default function Schedules() {
  const [filter, setFilter] = useState({ fn: items => { return items } })
  const [openPopup, setOpenPopup] = useState(false)
  const { schedule }  = useSelector((state) => state.schedule)
  const employees = useSelector((state) => state.employees.data)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let { id } = useParams()  
  
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
  ]

  useEffect(() => {
    dispatch(getSchedule(id))
    dispatch(getEmployees())
  }, [])
  
    const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  } = useTable(schedule.employeeSchedules, headCells, filter)

  
  return (
    <>
      <IconButton onClick={()=> navigate('/')}><ArrowBackRoundedIcon /></IconButton>
      <Container>
        <Button
          sx={{mt:5, mb: 2, ml:3}}
          variant='contained'
          size='large'
          onClick={() => { setOpenPopup(true) }}>Rediģēt</Button>
          <Container>
            <TblContainer>
              <TblHead />
              <TableBody>
                {
                  recordsAfterPagingAndSorting().map(item => {
                    const emp = employees.find(i => i._id === item.employee._id )
                    const checkDate = (day) => {
                      return emp?.absences.find(i => i.startDate <= day.toISOString() && i.endDate >= day.toISOString())?.absenceType
                    }
                    return (
                      <TableRow key={item._id}>
                        <TableCell>{`${item.employee.firstName} ${item.employee.lastName}`}</TableCell>
                        

                        <TableCell>
                          {
                            checkDate(dayDates.monday) ? <Chip label={checkDate(dayDates.monday)} /> : ""
                          }
                        </TableCell>
                        <TableCell>
                          {
                            checkDate(dayDates.tuesday)

                          }
                        </TableCell>
                        <TableCell>
                          {
                            checkDate(dayDates.wednesday)
                          }
                        </TableCell>
                        <TableCell>
                          {
                            checkDate(dayDates.thursday)
                          }
                        </TableCell>
                        <TableCell>
                          {
                            checkDate(dayDates.friday)
                          }
                        </TableCell>
                        <TableCell>
                          {
                            checkDate(dayDates.saturday)
                          }
                        </TableCell>
                        <TableCell>
                          {
                            checkDate(dayDates.sunday)
                          }
                        </TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
           </TblContainer>
            <TblPagination />
        </Container>

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

