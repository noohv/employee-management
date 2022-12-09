import React, { useState, useEffect } from 'react'
import { TableBody, TableCell, TableRow } from "@mui/material";
import useTable from '../Reusable/useTable';
import { useDispatch } from 'react-redux';

export default function UserList({ users, setNotify, error, success }) {
  const [filter, setFilter] = useState({fn: items => { return items; }})
  const dispatch = useDispatch()

  const headCells = [
    { id: 'name', label: 'Vārds Uzvārds' },
    { id: 'email', label: 'E-pasts'},
    { id: 'role', label:'Loma' },
  ]

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  } = useTable(users, headCells, filter);


  useEffect(() => {
    if(error) {
      setNotify({ isOpen: true, message: error , type: 'error' })
      dispatch({type: 'CLEAR_AUTH_MESSAGE'})
    }

    if(success) {
      setNotify({ isOpen: true, message: success , type: 'success' })
      dispatch({type: 'CLEAR_AUTH_MESSAGE'})
    }
  }, [error, success])

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
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.role}</TableCell>
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
