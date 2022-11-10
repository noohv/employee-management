import React, { useEffect, useState } from 'react';
import EmployeesList from "./EmployeesList";
import { useDispatch, useSelector } from "react-redux";
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getEmployees } from '../../actions/employees';
import { getJobTitles } from '../../actions/jobTitle'
import Stats from './Stats/Stats';

export default function Employees() {
    const employees = useSelector((state) => state.employees.data);
    const [time, setItem] = useState(new Date())
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch({ type: 'LOG_OUT' });
        navigate("/auth", { replace: true })
        setUser(null);
    }
    


    useEffect(() => {
        dispatch(getEmployees());
        dispatch(getJobTitles())
        // if(time >= user.result.expDate) {
        //     logout()
        // }
        document.title = "Darbinieku saraksts"
    }, [time]);

    return (
        <Container>
            <Stats employees={employees} /> 
            <EmployeesList employees={employees} />
        </Container>
    )
}
