import React, { useState } from "react";
import { useSelector } from "react-redux";
import { InputAdornment, TableBody, TableCell, TableRow, Toolbar } from "@mui/material";
import useTable from "../Reusable/useTable";
import Controls from "../Reusable/controls/Controls";
import { Search } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import EmployeesLoadingSkeleton from "./EmployeesLoadingSkeleton";
import Popup from "../Reusable/Popup";
import Form from "../Form/Form";

export default function EmployeesList({ currentId, setCurrentId, employees}) {
    const showLoading = useSelector((state) => state.employees.loading);
    const [filter, setFilter] = useState({fn: items => { return items; }});
    const [openPopup, setOpenPopup] = useState(false);

    const headCells = [
        { id: 'firstName', label: 'Vārds' },
        { id: 'lastName', label: 'Uzvārds' },
        { id: 'startDate', label: 'Sākuma Datums'},
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
                    <Controls.Input
                        label="Meklēt"
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
                    <Controls.Button 
                        sx={{
                            display:'flex',
                            justifyContent:'flex-end',
                            alignItems: 'flex-end'
                        }}
                        text= "Pievienot"
                        onClick={() => setOpenPopup(true)}
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
                                        <TableCell>
                                            <Controls.ActionButton>
                                                <EditIcon
                                                    onClick = {() => {
                                                        setCurrentId(item._id)
                                                        setOpenPopup(true)
                                                    }}
                                                />
                                            </Controls.ActionButton>
                                            <Controls.ActionButton>
                                                <SettingsIcon />
                                            </Controls.ActionButton>
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
                    <Form currentId={currentId} setCurrentId= {setCurrentId} setOpenPopup={setOpenPopup} />
                </Popup>
            </>
        : <EmployeesLoadingSkeleton />}
        </>
    )
}