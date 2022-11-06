import React, { useState, useEffect } from "react";
import { Container, TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createJobTitle } from "../../../actions/jobTitle";


export default function Form({setOpenPopup}) {
    const initialData = { name: '', description:''}
    const [jobTitleData, setJobTitleData] = useState(initialData)
    // const { employee } = useSelector((state) => state.employees)
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target

        setJobTitleData({ ...jobTitleData, [name]:value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // if(currentId){
        //     dispatch(updateEmployee(currentId,employeeData));
        // } else {
        //     dispatch(createEmployee(employeeData));
        // }

        dispatch(createJobTitle(jobTitleData));

        setOpenPopup(false);
        clear();

    }

    const clear = () => {
        setJobTitleData(initialData)
    }

    // useEffect(() => {
    //     if(employee) setEmployeeData(employee);
    // }, [employee])


    return (
        <Container>
                <form onSubmit={handleSubmit}>
                    <TextField sx={{m:0.5}} name="name" variant="outlined" label="Nosaukums" fullWidth autoFocus required value={jobTitleData.name} onChange={handleChange} />
                    <TextField sx={{m:0.5}} name="description" variant="outlined" label="Apraksts" multiline maxRows={4} minRows={4} fullWidth required value={jobTitleData.description} onChange={handleChange} />
                    <Button sx={{m:0.5}} variant="contained" color="primary" size="large" type="submit" fullWidth>Saglabāt</Button>
                    <Button sx={{m:0.5}} variant="contained" color="secondary" size="small" onClick={() => {
                        clear()
                        setOpenPopup(false)}
                    } fullWidth>Atcelt</Button>
                </form>
        </Container>
    );
}