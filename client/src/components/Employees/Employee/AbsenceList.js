import React, { useState } from 'react'
import { TableBody, TableCell, TableRow, IconButton } from "@mui/material";
import { deleteAbsence } from '../../../actions/employees';
import useTable from "../../Reusable/useTable";
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function AbsenceList({ empId, absences, confirmDialog , setConfirmDialog, setOpenPopup, setOpenPopupType, setCurrentId }) {
  const [filter, setFilter] = useState({fn: items => { return items; }})
  const dispatch = useDispatch()

  const headCells = [
    { id: 'absenceType', label: 'Veids' },
    { id: 'startDate', label: 'No'},
    { id: 'endDate', label:'Līdz' },
    { id: 'actions', label: '', disableSorting:true}
  ]  

  const onDelete = (item) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })
    dispatch(deleteAbsence(item._id, empId))
  }

  const {
    TblContainer,
    TblHead,
    TblPagination,
    finalRecords
  } = useTable(absences, headCells, filter)

  return (
  <>
    <TblContainer>
      <TblHead />
      <TableBody>
        {
          finalRecords().map(item => {
            return (
              <TableRow key={item._id}>
                <TableCell>{item.absenceType === 'vacation' ? "Atvaļinājums" : item.absenceType === 'sick' ? "Slims" : "Cits"}</TableCell>
                <TableCell>{item.startDate.slice(0,10)}</TableCell>
                <TableCell>{item.endDate.slice(0,10)}</TableCell>
                <TableCell align='center'>
                  <IconButton onClick={() => { 
                      setOpenPopupType("editAbsence")
                      setOpenPopup(true) 
                      setCurrentId(item._id)  
                    }}>
                      <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => { 
                    setConfirmDialog({
                      isOpen: true,
                      title: 'Vai dzēst prombūtnes ierakstu?',
                      subTitle: 'Dati tiks neatgriezeniski dzēsti',
                      onConfirm: () => onDelete(item)
                    })      
                  }}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          })
        }
      </TableBody>
    </TblContainer>
    <TblPagination />
  </>
  )
}
