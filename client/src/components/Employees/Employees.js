import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CircularProgress, TableBody, TableCell, TableRow } from "@mui/material";
import useTable from "../Reusable/useTable";

import Employee from "./Employee/Employee";

const Employees = () => {
    const employees = useSelector((state) => state.employees);

    const headCells = [
        { id: 'firstName', label: 'Vārds' },
        { id: 'lastName', label: 'Uzvārds' },
        { id: 'startDate', label: 'Sākuma Datums', disableSorting:true }
    ]

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(employees, headCells);


    return (
        <>
            <TblContainer>
                <TblHead />
                <TableBody>
                    {
                        recordsAfterPagingAndSorting().map(item => {
                            let shortDate=''
                            if(item.startDate) {
                                shortDate = item.startDate.slice(0,10)
                            }


                            return (
                                <TableRow key={item._id}>
                                    <TableCell>{item.firstName}</TableCell>
                                    <TableCell>{item.lastName}</TableCell>
                                    <TableCell>{shortDate}</TableCell>
                                 </TableRow>
                            )
                        }
                            


                        )
                    }
                </TableBody>
            </TblContainer>
            <TblPagination />
        </>
    )
}

export default Employees;