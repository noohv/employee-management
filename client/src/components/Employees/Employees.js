import React, { useEffect, useState } from 'react';
import EmployeesList from "./EmployeesList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { getEmployees } from '../../actions/employees';
import { getJobTitles } from '../../actions/jobTitle'
import Stats from './Stats/Stats';

export default function Employees() {
    const employees = useSelector((state) => state.employees.data);
    const jobTitles = useSelector((state) => state.jobTitle);

    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {dispatch(getEmployees())}, 1000)
        dispatch(getJobTitles())
        document.title = "Darbinieku saraksts"
    }, []);

    return (
        <Container>
            <Stats employees={employees} /> 
            <EmployeesList employees={employees} jobTitles={jobTitles} />
        </Container>
    )
}
