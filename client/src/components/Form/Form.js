import React, { useState, useEffect } from "react";
import { Container, TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createEmployee, updateEmployee } from "../../actions/employees";


export default function Form({currentId, setCurrentId,setOpenPopup}) {
    const initialData = { firstName:'', lastName:'', startDate: '', tags:'' }
    const [employeeData, setEmployeeData] = useState(initialData)
    const employee = useSelector((state) => currentId ? state.employees.eventData.find((x) => x._id === currentId) : null)
    const dispatch = useDispatch();


    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(currentId){
            dispatch(updateEmployee(currentId,employeeData));
        } else {
            dispatch(createEmployee(employeeData));
        }
        clear()
        setOpenPopup(false)
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
                <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <TextField sx={{m:0.5}} name="firstName" variant="outlined" label="Vārds" fullWidth value={employeeData.firstName} onChange={(e) => setEmployeeData({ ...employeeData, firstName: e.target.value })} />
                    <TextField sx={{m:0.5}} name="lastName" variant="outlined" label="Uzvārds" fullWidth value={employeeData.lastName} onChange={(e) => setEmployeeData({ ...employeeData, lastName: e.target.value })} />
                    <TextField sx={{m:0.5}} name="startDate" variant="outlined" label="Sākuma datums" type="date" InputLabelProps={{shrink:true}} fullWidth value={employeeData.startDate} onChange={(e) => setEmployeeData({ ...employeeData, startDate: e.target.value })} />
                    <TextField sx={{m:0.5}} name="tags" variant="outlined" label="Tagi" fullWidth value={employeeData.tags} onChange={(e) => setEmployeeData({ ...employeeData, tags: e.target.value })} />
                    <Button sx={{m:0.5}} variant="contained" color="primary" size="large" type="submit" fullWidth>Izveidot</Button>
                    <Button sx={{m:0.5}} variant="contained" color="secondary" size="small" onClick={() => {
                        clear()
                        setOpenPopup(false)}
                    } fullWidth>Atcelt</Button>
                </form>
        </Container>
    );
}