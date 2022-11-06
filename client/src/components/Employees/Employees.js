import React, { useEffect } from 'react';
import EmployeesList from "./EmployeesList";
import { useDispatch, useSelector } from "react-redux";
import { Container } from '@mui/material';
import { getEmployees } from '../../actions/employees';
import { getJobTitles } from '../../actions/jobTitle'

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
            <EmployeesList 
                employees={employees}    
            />
        </Container>
    )
}
