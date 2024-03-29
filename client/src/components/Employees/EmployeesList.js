import React, { useState } from "react";
import { useSelector } from "react-redux";
import { InputAdornment, TableBody, TableCell, TableRow, Toolbar, IconButton, Button, TextField, Tooltip } from "@mui/material";
import useTable from "../Reusable/useTable";
import { Search } from "@mui/icons-material";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import EmployeesLoadingSkeleton from "./EmployeesLoadingSkeleton";
import Popup from "../Reusable/Popup";
import Form from "./Form/Form";
import { Link } from "react-router-dom";
import CircleIcon from '@mui/icons-material/Circle';

export default function EmployeesList({ employees, jobTitles, setNotify }) {
  const showLoading = useSelector((state) => state.employees.isLoading) // Loading state when data is fetched
  const [filter, setFilter] = useState({ fn: items => { return items } }) // Filtered items by search
  const [openPopup, setOpenPopup] = useState(false) // Popup open state
  const currentDate = new Date() // Get current date

  // Head rows of table
  const headCells = [
    { id: 'status', label: 'Statuss', disableSorting: true},
    { id: 'firstName', label: 'Vārds' },
    { id: 'lastName', label: 'Uzvārds' },
    { id: 'jobTitle', label: 'Amats' },
    { id: 'actions', label: '', disableSorting: true }
  ]

  // Get status type for employee
  const getStatus = (item) => {

    // Find absence which overlays current date (today)
    const type = item.absences.find(item => item.startDate.slice(0, 10) <= currentDate.toISOString().slice(0, 10) 
      && item.endDate.slice(0, 10) >= currentDate.toISOString().slice(0, 10))?.absenceType
    
      if(type === "vacation") return "statusVacation"
    else if(type === "sick") return "statusSick"
    else if(type === "other") return "statusOther"
    else return "statusActive"
  }

  // Deconstruct imported table
  const {
    TblContainer,
    TblHead,
    TblPagination,
    finalRecords
  } = useTable(employees, headCells, filter)

  // Handle search for employees list, searchable by name and/or jobtitle
  const handleSearch = e => {
    const { value } = e.target

    setFilter({
      fn: items => {
        if(value === "")
          return items // Return all records if no search query
        else if(value === " ")
          return [] // Return empty list if search query is space
        else
          // Filter records by searched value
          return items.filter(x => {
            // Concatenate item data into one string seperated by spaces
            const data = x.firstName.concat(" ", x.lastName).concat(" ", x.jobTitle.name || jobTitles.data.find(y => y._id === y.jobTitle)?.name)
            
            // Return data which includes searched value when shifted to lower case
            return data.toLowerCase().includes(value.toLowerCase()) // Check if data string includes searched query, both shifted to lower case
          })
      }
    })
  }

  return (
    <>
      {!showLoading ? 
        <>
          <Toolbar sx={{
            display:'flex',
            justifyContent: 'space-between'
          }}>
            <Button size="large" variant="contained" color="secondary" onClick={() => setOpenPopup(true)}>Pievienot</Button>
            <TextField label="Meklēt"
              InputProps={{startAdornment:(<InputAdornment position="start"><Search /></InputAdornment>)}}
              sx={{ width:'35%' }}
              onChange={handleSearch}
            />
          </Toolbar>

          <TblContainer>
              <TblHead />

              <TableBody>
                {
                  finalRecords().map(item => {
                    return (
                      <TableRow key={item._id}>
                        <TableCell>
                          <Tooltip title={getStatus(item) === "statusActive" ? "Aktīvs" : getStatus(item) === "statusVacation" ? "Atvaļinājumā" : getStatus(item)==="statusSick" ? "Slims" : "Cits"}>
                            <CircleIcon color={getStatus(item)} />
                          </Tooltip>
                        </TableCell>
                        <TableCell>{item.firstName}</TableCell>
                        <TableCell>{item.lastName}</TableCell>
                        <TableCell>{item.jobTitle?.name || jobTitles.data.find(x => x._id === item.jobTitle)?.name}</TableCell>
                        <TableCell align="center">
                          <IconButton component={Link} to={`/darbinieki/${item._id}`}>
                            <KeyboardArrowRightIcon />
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
            <Form 
              setOpenPopup={setOpenPopup}
              setNotify={setNotify}
            />
          </Popup>

        </>
    : <EmployeesLoadingSkeleton />}
    </>
  )
}