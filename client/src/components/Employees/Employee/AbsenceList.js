import React, { useState } from 'react'
import { TableBody, TableCell, TableRow, Button } from "@mui/material";
import { deleteAbsence } from '../../../actions/employees';
import useTable from "../../Reusable/useTable";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';


export default function AbsenceList({empId, absences }) {
    const [filter, setFilter] = useState({fn: items => { return items; }});
    const dispatch = useDispatch()

    const headCells = [
        { id: 'absenceType', label: 'Veids' },
        { id: 'startDate', label: 'No'},
        { id: 'endDate', label:'Līdz' },
        { id: 'actions', label: 'Darbības'}
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
                            <TableCell>
                                <Button onClick={() => {
                                    dispatch(deleteAbsence(item._id, empId))
                                }}>
                                    DEL
                                </Button>
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
