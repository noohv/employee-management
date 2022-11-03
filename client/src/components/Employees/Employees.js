import React, { useEffect } from 'react';
import EmployeesList from "./EmployeesList";
import { useDispatch, useSelector } from "react-redux";
import { Container } from '@mui/material';
import { getEmployees } from '../../actions/employees';

export default function Employees() {
    const employees = useSelector((state) => state.employees.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEmployees());
    }, []);

    return (
        <Container>
            <EmployeesList 
                employees={employees}    
            />
        </Container>
    )
}