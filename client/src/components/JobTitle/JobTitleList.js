import React, { useState } from 'react'
import { TableBody, TableCell, TableRow, IconButton, Tooltip } from "@mui/material";
import useTable from '../Reusable/useTable';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deleteJobTitle } from '../../actions/jobTitle';

export default function AbsenceList({ setCurrentId, jobTitles, confirmDialog, setOpenPopupType, setConfirmDialog, setOpenPopup }) {
  const [filter, setFilter] = useState({fn: items => { return items }})
  const dispatch = useDispatch()

  const headCells = [
    { id: 'name', label: 'Nosaukums' },
    { id: 'description', label: 'Apraksts'},
    { id: 'count', label:'Darbinieku daudz.', disableSorting: true },
    { id: 'properties', label:'', disableSorting: true },
  ]

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  } = useTable(jobTitles, headCells, filter);

  const onDelete = (item) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })
    dispatch(deleteJobTitle(item._id))
  }

  return (
    <>
      <TblContainer>
        <TblHead />
        <TableBody>
            {
              recordsAfterPagingAndSorting().map(item => {
                return (
                  <TableRow key={item._id}>
                    <TableCell>{item.name}</TableCell>
                    <Tooltip title={item.description} placement="left">
                      <TableCell>
                        {
                          item.description.length > 15 ? `${item.description.substring(0,15)}...` : item.description
                        }
                      </TableCell>
                    </Tooltip>
                    <TableCell>{item.employees.length}</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => { 
                        setOpenPopupType("edit")
                        setOpenPopup(true) 
                        setCurrentId(item._id)  
                      }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => { 
                        setConfirmDialog({
                          isOpen: true,
                          title: 'Vai dzēst amatu?',
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
