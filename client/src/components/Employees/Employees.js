import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CircularProgress, InputAdornment, TableBody, TableCell, TableRow, Toolbar } from "@mui/material";
import useTable from "../Reusable/useTable";
import Controls from "../Reusable/controls/Controls"
import { Search } from "@mui/icons-material"

import Employee from "./Employee/Employee";

const Employees = () => {
    const employees = useSelector((state) => state.employees);
    
    const [filter, setFilter] = useState({fn: items => { return items; }});


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
    } = useTable(employees, headCells, filter);

    const handleSearch = e => {
        let target = e.target;
        setFilter({
            fn: items => {
                if(target.value =="")
                    return items;
                else if(target.value==" ")
                    return [];
                else
                    return items.filter(x => {
                        let fullName = x.firstName.concat(" ", x.lastName)
                        return fullName.toLowerCase().includes(target.value.toLowerCase())
                    })
            }
        })
    }

    return (
        <>
            <Toolbar>
                <Controls.Input
                    label="Meklēt darbinieku"
                    InputProps={{
                        startAdornment:(
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        )
                    }}

                    sx={{
                        width:'35%'
                    }}
                    onChange={handleSearch}
                />
            </Toolbar>
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
                        })
                    }
                </TableBody>
            </TblContainer>
            <TblPagination />
        </>
    )
}

export default Employees;