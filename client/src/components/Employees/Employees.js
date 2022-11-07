import React, { useEffect } from 'react';
import EmployeesList from "./EmployeesList";
import { useDispatch, useSelector } from "react-redux";
import { Container } from '@mui/material';
import { getEmployees } from '../../actions/employees';
import { getJobTitles } from '../../actions/jobTitle'
import ActiveStats from './Stats/Stats';

export default function Employees() {
    const employees = useSelector((state) => state.employees.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEmployees());
        dispatch(getJobTitles())
        document.title = "Darbinieku saraksts"
    }, []);

    return (
        <Container>
            <ActiveStats employees={employees} />
            <EmployeesList employees={employees} />
        </Container>
    )
}
