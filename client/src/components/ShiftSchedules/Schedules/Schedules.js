import React, { useEffect, useState } from 'react'
import ScheduleForm from './ScheduleForm'
import Popup from "../../Reusable/Popup";
import { Button, Container, TableBody, TableCell, TableRow, IconButton, Chip, Typography, Divider } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { deleteSchedule, getSchedules } from "../../../actions/schedule";
import { Link } from "react-router-dom";
import useTable from '../../Reusable/useTable';
import ConfirmDialog from '../../Reusable/ConfirmDialog';

export default function Schedules({ setNotify }) {
  const [filter, setFilter] = useState({ fn: items => { return items } })
  const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: ''})
  const [openPopup, setOpenPopup] = useState(false)
  const schedules = useSelector((state) => state.schedule.data)
  const { error, success } = useSelector((state) => state.schedule)
  const dispatch = useDispatch()

  const headCells = [
    { id: 'startDate', label: 'Sākuma datums' },
    { id: 'endDate', label: 'Beigu datums' },
    { id: 'shiftCount', label: 'Maiņas', disableSorting: true },
    { id: 'actions', label: '', disableSorting: true }
  ]

  const {
    TblContainer,
    TblHead,
    TblPagination,
    finalRecords
  } = useTable(schedules, headCells, filter)

  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })
    dispatch(deleteSchedule(id))
  }

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
      <Container>
        <Typography sx={{mt:3, mb:3}} variant='h4'>Grafiku saraksts</Typography>
        <Divider/>
      </Container>
      <Container>
      <Button
        sx={{mt:5, mb: 2, ml:3}}
        variant='contained'
        size='large'
        color="secondary"
        onClick={() => { setOpenPopup(true) }}>Pievienot</Button>
      <Container>
      <TblContainer>
        <TblHead />
        <TableBody>
          {
            finalRecords().map(item => {
              return (
                <TableRow key={item._id}>
                  <TableCell>{item.startDate.slice(0,10)}</TableCell>
                  <TableCell>{item.endDate.slice(0,10)}</TableCell>
                  <TableCell>
                    {item.shifts.morning ? <Chip sx={{m:0.5}} label="Rīta" /> : ""}
                    {item.shifts.evening ? <Chip sx={{m:0.5}} label="Vakara" /> : ""}
                    {item.shifts.night ? <Chip sx={{m:0.5}} label="Nakts" /> : ""}
                  </TableCell>
                  <TableCell align="center">  
                    <IconButton onClick={() => { 
                      setConfirmDialog({
                        isOpen: true,
                        title: 'Vai dzēst grafiku ierakstu?',
                        subTitle: 'Dati tiks neatgriezeniski dzēsti',
                        onConfirm: () => onDelete(item._id)
                      })      
                    }}>
                      <DeleteIcon />
                    </IconButton>  
                    <IconButton component={Link} to={`/grafiki/${item._id}`}>
                      <KeyboardArrowRightIcon />
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
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </Container>
    </>
  )
}
