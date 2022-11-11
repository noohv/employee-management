import React, { useState } from "react";
import { useSelector } from "react-redux";
import { InputAdornment, TableBody, TableCell, TableRow, Toolbar, IconButton, Button, TextField } from "@mui/material";
import useTable from "../Reusable/useTable";
import { Search } from "@mui/icons-material";
import SettingsIcon from '@mui/icons-material/Settings';
import EmployeesLoadingSkeleton from "./EmployeesLoadingSkeleton";
import Popup from "../Reusable/Popup";
import Form from "./Form/Form";
import { Link } from "react-router-dom";

export default function EmployeesList({ employees}) {
    const showLoading = useSelector((state) => state.employees.isLoading);
    const [filter, setFilter] = useState({fn: items => { return items; }});
    const [openPopup, setOpenPopup] = useState(false);

    const headCells = [
        { id: 'firstName', label: 'Vārds' },
        { id: 'lastName', label: 'Uzvārds' },
        { id: 'jobTitle', label: 'Amats'},
        { id: 'actions', label:'Darbības', disableSorting:true}
    ];

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
                if(target.value ==="")
                    return items;
                else if(target.value===" ")
                    return [];
                else
                    return items.filter(x => {
                        let fullName = x.firstName.concat(" ", x.lastName)
                        return fullName.toLowerCase().includes(target.value.toLowerCase())
                    })
            }
        })
    };

    return (
        <>
        {!showLoading ? 
            <>
                <Toolbar sx={{
                    display:'flex',
                    justifyContent: 'space-between'
                }}>
                    <Button size="large" variant="contained" onClick={() => setOpenPopup(true)}>Pievienot</Button>
                    <TextField label="Meklēt"
                        InputProps={{
                            startAdornment:(
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            )
                        }}
                        sx={{ width:'35%' }}
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
                                        <TableCell>{item.jobTitle.name}</TableCell>
                                        <TableCell>
                                            <IconButton component={Link} to={`/employees/${item._id}`}>
                                                <SettingsIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
                <Popup
                    title="Pievienot darbinieku"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                    <Form setOpenPopup={setOpenPopup} />
                </Popup>
            </>
        : <EmployeesLoadingSkeleton />}
        </>
    )
}