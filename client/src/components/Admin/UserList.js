import React, { useState } from 'react'
import { IconButton, TableBody, TableCell, TableRow } from "@mui/material";
import useTable from '../Reusable/useTable';
import DeleteIcon from '@mui/icons-material/Delete';

export default function UserList({ users }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const [filter, setFilter] = useState({fn: items => { return items }})

  const headCells = [
    { id: 'name', label: 'Vārds Uzvārds' },
    { id: 'email', label: 'E-pasts'},
    { id: 'role', label:'Loma' },
    { id: 'properties', label:'Darbības', disableSorting: true },
  ]

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  } = useTable(users, headCells, filter);

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
                    <TableCell>
                    {item._id !== user?.result._id &&
                      <IconButton>
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
