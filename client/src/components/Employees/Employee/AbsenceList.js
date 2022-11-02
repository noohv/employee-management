import React, { useState } from 'react'
import { TableBody, TableCell, TableRow } from "@mui/material";
import useTable from "../../Reusable/useTable";

export default function AbsenceList({absences}) {
    const [filter, setFilter] = useState({fn: items => { return items; }});

    const headCells = [
        { id: 'absenceType', label: 'Veids' },
        { id: 'startDate', label: 'No'},
        { id: 'endDate', label:'Līdz' }
    ];

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(absences, headCells, filter);

    return (
    <>
    <TblContainer>
        <TblHead />
        <TableBody>
            {
                recordsAfterPagingAndSorting().map(item => {
                    return (
                        <TableRow key={item._id}>
                            <TableCell>{item.absenceType}</TableCell>
                            <TableCell>{item.startDate.slice(0,10)}</TableCell>
                            <TableCell>{item.endDate.slice(0,10)}</TableCell>
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
