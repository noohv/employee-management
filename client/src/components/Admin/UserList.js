import React, { useState } from 'react'
import { IconButton, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import useTable from '../Reusable/useTable';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteUser } from  '../../actions/auth';
import { useDispatch } from "react-redux";

export default function UserList({ users, confirmDialog, setConfirmDialog }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const [filter, setFilter] = useState({fn: items => { return items }})
  const dispatch = useDispatch()

  const headCells = [
    { id: 'name', label: 'Vārds Uzvārds' },
    { id: 'email', label: 'E-pasts'},
    { id: 'role', label:'Loma' },
    { id: 'properties', label:'', disableSorting: true },
  ]

  const {
    TblContainer,
    TblHead,
    TblPagination,
    finalRecords
  } = useTable(users, headCells, filter);

  const onDelete = (item) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })
    dispatch(deleteUser(item._id))
  }

  return (
    <>
      <TblContainer>
        <TblHead />
        <TableBody>
            {
              finalRecords().map(item => {
                return (
                  <TableRow key={item._id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.role === 'admin' ? "Administrators" : "Lietotājs"}</TableCell>
                    <TableCell align="center">
                    {item._id !== user?.result._id &&
                      <IconButton onClick={() => { 
                        setConfirmDialog({
                          isOpen: true,
                          title: 'Vai dzēst lietotāju?',
                          subTitle: 'Dati tiks neatgriezeniski dzēsti',
                          onConfirm: () => onDelete(item)
                        })      
                      }}>
                        <DeleteIcon />
                      </IconButton>
                    }
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
