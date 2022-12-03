import React, { useEffect, useState } from 'react'
import ScheduleForm from './ScheduleForm'
import Popup from "../../Reusable/Popup";
import { Button, Container, TableBody, TableCell, TableRow, IconButton, Chip } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useDispatch, useSelector } from "react-redux";
import { getSchedules } from "../../../actions/schedule";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import useTable from '../../Reusable/useTable';

export default function Schedules({ setNotify }) {
  const [filter, setFilter] = useState({ fn: items => { return items } })
  const [openPopup, setOpenPopup] = useState(false)
  const schedules = useSelector((state) => state.schedule.data)
  const { error, success } = useSelector((state) => state.schedule)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const headCells = [
    { id: 'startDate', label: 'Sākuma datums' },
    { id: 'endDate', label: 'Beigu datums' },
    { id: 'shiftCount', label: 'Maiņas', disableSorting: true },
    { id: 'actions', label: 'Darbības', disableSorting: true }
  ]

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  } = useTable(schedules, headCells, filter)

  useEffect(() => {
    dispatch(getSchedules())
    if(error) {
      setNotify({ isOpen: true, message: error , type: 'error' })
      dispatch({type: 'CLEAR_SCHEDULES_MESSAGE'})

    }
    if(success) {
      setNotify({ isOpen: true, message: success , type: 'success' })
      dispatch({type: 'CLEAR_SCHEDULES_MESSAGE'})
    }
    document.title = "Darba Grafiki"
  }, [error, success])

  return (
    <>
      <IconButton sx={{mt:'1%', ml:'1%'}} onClick={()=> navigate(-1)}><ArrowBackRoundedIcon /></IconButton>
      <Container>
      <Button
        sx={{mt:5, mb: 2, ml:3}}
        variant='contained'
        size='large'
        onClick={() => { setOpenPopup(true) }}>Pievienot</Button>
      <Container>
      <TblContainer>
        <TblHead />
        <TableBody>
          {
            recordsAfterPagingAndSorting().map(item => {
              return (
                <TableRow key={item._id}>
                  <TableCell>{item.startDate.slice(0,10)}</TableCell>
                  <TableCell>{item.endDate.slice(0,10)}</TableCell>
                  <TableCell>
                    {item.shifts.morning ? <Chip sx={{m:0.5}} label="Rīta" /> : ""}
                    {item.shifts.evening ? <Chip sx={{m:0.5}} label="Vakara" /> : ""}
                    {item.shifts.night ? <Chip sx={{m:0.5}} label="Nakts" /> : ""}
                  </TableCell>
                  <TableCell>
                    <IconButton component={Link} to={`/grafiki/${item._id}`}>
                      <SettingsIcon />
                    </IconButton>   
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

