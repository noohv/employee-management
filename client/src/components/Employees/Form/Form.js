import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createEmployee, updateEmployee } from "../../../actions/employees";


export default function Form({ currentId, setOpenPopup, notify, setNotify }) {
  const initialData = { firstName:'', lastName:'', phone: '', email:'', address: '',  startDate: '', jobTitle:'' }
  const [employeeData, setEmployeeData] = useState(initialData)
  const { employee } = useSelector((state) => state.employees)
  const jobTitleList = useSelector((state) => state.jobTitle.data)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target
    setEmployeeData({ ...employeeData, [name]:value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if(currentId){
      dispatch(updateEmployee(currentId,employeeData))
    } else {
      dispatch(createEmployee(employeeData))
    }
    setOpenPopup(false)
    clear()
    setNotify({ isOpen: true, message: "Dati veiksmīgi iesniegti!", type: 'success' })
  }

  const clear = () => { setEmployeeData(initialData) }

  useEffect(() => {
    if(employee) setEmployeeData(employee)
  }, [employee])

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField sx={{m:1}} name="firstName" variant="outlined" label="Vārds" fullWidth autoFocus required value={employeeData.firstName} onChange={handleChange} />
        <TextField sx={{m:1}} name="lastName" variant="outlined" label="Uzvārds" fullWidth required value={employeeData.lastName} onChange={handleChange} />
        <TextField sx={{m:1}} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} name="phone" variant="outlined" label="Tālr. nr." type="text" min="8" fullWidth value={employeeData.phone} onChange={handleChange} />
        <TextField sx={{m:1}} name="email" variant="outlined" label="E-pasts" type="email" fullWidth value={employeeData.email} onChange={handleChange} />
        <TextField sx={{m:1}} name="address" variant="outlined" label="Adrese" type="text" fullWidth value={employeeData.address} onChange={handleChange} />
        <TextField sx={{m:1}} name="startDate" variant="outlined" label="Sākuma datums" type="date" required InputLabelProps={{shrink:true}} fullWidth value={employeeData.startDate.slice(0,10)} onChange={handleChange} />
        <FormControl sx={{m:1}} required fullWidth>
          <InputLabel htmlFor="jobTitle">Amats</InputLabel>
          <Select labelId="jobTitle" label="Amats" name="jobTitle" onChange={handleChange} value={employeeData.jobTitle._id || employeeData.jobTitle} >
            {jobTitleList.map((item) => (
              <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button sx={{m:1}} variant="contained" color="primary" size="large" type="submit" fullWidth>Saglabāt</Button>
        <Button sx={{m:1}} variant="contained" color="secondary" size="small" onClick={() => {
          clear()
          setOpenPopup(false)}
        } fullWidth>Atcelt</Button>
      </form>
    </Container>
  );
}