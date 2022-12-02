import React, { useState, useEffect } from 'react'
import { TableBody, TableCell, TableRow, IconButton } from "@mui/material";
import useTable from '../../Reusable/useTable';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function AbsenceList({ jobTitles }) {
  const [filter, setFilter] = useState({fn: items => { return items; }})
  const dispatch = useDispatch()

  const headCells = [
    { id: 'name', label: 'Nosaukums' },
    { id: 'description', label: 'Apraksts'},
    { id: 'count', label:'Darbinieku daudz.', disableSorting: true },
    { id: 'properties', label:'Darbības', disableSorting: true },
  ]

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  } = useTable(jobTitles, headCells, filter);

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
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.employees.length}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => {

                      }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => {

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
