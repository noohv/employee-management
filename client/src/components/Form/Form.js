import React, { useState } from "react";
import { Container, TextField, Button, Typography, Modal, Fade, Box, Backdrop } from '@mui/material';
import { useDispatch } from 'react-redux';
import { createEmployee } from "../../actions/employees";


const Form = () => {
    const [employeeData, setEmployeeData] = useState({ firstName:'', lastName:'', startDate: '', tags:'' })
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createEmployee(employeeData));
    }

    const clear = () => {

    }

    return (
        <Container>
                <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Typography sx={{m:0.5}} variant="h6">Pievienot darbinieku</Typography>
                    <TextField sx={{m:0.5}} name="firstName" variant="outlined" label="Vārds" fullWidth value={employeeData.firstName} onChange={(e) => setEmployeeData({ ...employeeData, firstName: e.target.value })} />
                    <TextField sx={{m:0.5}} name="lastName" variant="outlined" label="Uzvārds" fullWidth value={employeeData.lastName} onChange={(e) => setEmployeeData({ ...employeeData, lastName: e.target.value })} />
                    <TextField sx={{m:0.5}} name="startDate" variant="outlined" label="Sākuma datums" type="date" InputLabelProps={{shrink:true}} fullWidth value={employeeData.startDate} onChange={(e) => setEmployeeData({ ...employeeData, startDate: e.target.value })} />
                    <TextField sx={{m:0.5}} name="tags" variant="outlined" label="Tagi" fullWidth value={employeeData.tags} onChange={(e) => setEmployeeData({ ...employeeData, tags: e.target.value })} />
                    <Button sx={{m:0.5}} variant="contained" color="primary" size="large" type="submit" fullWidth>Izveidot</Button>
                    <Button sx={{m:0.5}} variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Atcelt</Button>
                </form>
        </Container>
    );
}

export default Form;