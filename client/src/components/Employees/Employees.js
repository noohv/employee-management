import React, {useState, useEffect } from 'react';
import EmployeesList from "./EmployeesList";
import { useDispatch, useSelector } from "react-redux";
import { Container, Grow } from '@mui/material';
import { getEmployees } from '../../actions/employees';

export default function Employees() {
    const employees = useSelector((state) => state.employees.eventData);
    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch();

    useEffect(() => {
        if(!currentId) {
            dispatch(getEmployees());
        }
    }, [currentId, dispatch])


    return (
        <Container>
            <EmployeesList 
                currentId={currentId}
                setCurrentId={setCurrentId}
                employees={employees}    
            />
        </Container>
    )
}
