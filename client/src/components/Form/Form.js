import React, { useState, useEffect } from "react";
import { Container, TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createEmployee, updateEmployee } from "../../actions/employees";


export default function Form({currentId, setCurrentId,setOpenPopup}) {
    const initialData = { firstName:'', lastName:'', phone: '', email:'', address: '',  startDate: ''}
    const [employeeData, setEmployeeData] = useState(initialData)
    const employee = useSelector((state) => currentId ? state.employees.eventData.find((x) => x._id === currentId) : null)
    
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target

        setEmployeeData({ ...employeeData, [name]:value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId){
            dispatch(updateEmployee(currentId,employeeData));
        } else {
            dispatch(createEmployee(employeeData));
        }
        setOpenPopup(false);
        clear();

    }

    const clear = () => {
        setCurrentId(null)
        setEmployeeData(initialData)
    }

    useEffect(() => {
        if(employee) setEmployeeData(employee);
    }, [employee])


    return (
        <Container>
                <form onSubmit={handleSubmit}>
                    <TextField sx={{m:0.5}} name="firstName" variant="outlined" label="Vārds" fullWidth autoFocus required value={employeeData.firstName} onChange={handleChange} />
                    <TextField sx={{m:0.5}} name="lastName" variant="outlined" label="Uzvārds" fullWidth required value={employeeData.lastName} onChange={handleChange} />
                    <TextField sx={{m:0.5}} name="phone" variant="outlined" label="Tālr. nr." type="text" min="8" fullWidth value={employeeData.phone} onChange={handleChange} />
                    <TextField sx={{m:0.5}} name="email" variant="outlined" label="E-pasts" type="email" fullWidth value={employeeData.email} onChange={handleChange} />
                    <TextField sx={{m:0.5}} name="address" variant="outlined" label="Adrese" type="text" fullWidth value={employeeData.address} onChange={handleChange} />
                    <TextField sx={{m:0.5}} name="startDate" variant="outlined" label="Sākuma datums" type="date" required InputLabelProps={{shrink:true}} fullWidth value={employeeData.startDate.slice(0,10)} onChange={handleChange} />
                    <Button sx={{m:0.5}} variant="contained" color="primary" size="large" type="submit" fullWidth>Izveidot</Button>
                    <Button sx={{m:0.5}} variant="contained" color="secondary" size="small" onClick={() => {
                        clear()
                        setOpenPopup(false)}
                    } fullWidth>Atcelt</Button>
                </form>
        </Container>
    );
}