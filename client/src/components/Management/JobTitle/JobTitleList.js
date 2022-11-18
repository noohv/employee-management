import React, { useState } from 'react'
import { TableBody, TableCell, TableRow, Button } from "@mui/material";
import useTable from '../../Reusable/useTable';
import { useDispatch } from 'react-redux';


export default function AbsenceList({ jobTitles }) {
  const [filter, setFilter] = useState({fn: items => { return items; }})
  const dispatch = useDispatch()

  const headCells = [
    { id: 'name', label: 'Nosaukums' },
    { id: 'description', label: 'Apraksts'},
    { id: 'count', label:'Darbinieku daudz.' },
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
