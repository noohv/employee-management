import React, { useEffect, useState } from 'react'
import ScheduleForm from './ScheduleForm'
import Popup from "../../Reusable/Popup";
import { Button, Container, TableBody, TableCell, TableRow, Toolbar, IconButton, Chip } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useDispatch, useSelector } from "react-redux";
import { getSchedule } from "../../../actions/schedule";
import { getEmployees } from "../../../actions/employees";
import { useParams, useNavigate } from 'react-router-dom';
import useTable from '../../Reusable/useTable';

export default function Schedules() {
  const [filter, setFilter] = useState({ fn: items => { return items } })
  const [openPopup, setOpenPopup] = useState(false)
  const { schedule }  = useSelector((state) => state.schedule)
  const employees = useSelector((state) => state.employees.data)
  const [currentDate, setCurrentDate] = useState(new Date())
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let { id } = useParams()  
  
  const headCells = [
    { id: 'fullName', label: 'Vārds Uzvārds' },
    { id: '1', label: `Pirmdiena`, disableSorting: true },
    { id: '2', label: 'Otrdiena', disableSorting: true },
    { id: '3', label: 'Trešdiena', disableSorting: true },
    { id: '4', label: 'Ceturtdiena', disableSorting: true },
    { id: '5', label: 'Piektdiena', disableSorting: true },
    { id: '6', label: 'Sestdiena', disableSorting: true },
    { id: '7', label: `Svētdiena`, disableSorting: true },
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
          onClick={() => { setOpenPopup(true) }}>Pievienot</Button>
        {schedule ?         
          <Container>
            <TblContainer>
              <TblHead />
              <TableBody>
                {
                  recordsAfterPagingAndSorting().map(item => {
                    return (
                      <TableRow key={item._id}>
                        <TableCell>{`${item.employee.firstName} ${item.employee.lastName}`}</TableCell>
                        <TableCell>
                          <Chip label="Rīta" size="small" />
                          <Chip label="Vakara" size="small" />
                        </TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
           </TblContainer>
            <TblPagination />
        </Container>
      : 
      <div>
        
      </div>
      }

      <Popup
        title="Grafika laika posms"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ScheduleForm setOpenPopup={setOpenPopup} />
      </Popup>
    </Container>

    </>
  )
}

