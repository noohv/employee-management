import React, { useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material'
import { useDispatch } from "react-redux";

import { getEmployees } from './actions/employees';

import Employees from "./components/Employees/Employees";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEmployees());
    }, [dispatch])

    return (
        <Container>
            <AppBar position="static" justify="space-between" sx={{m:2}}>
                <Typography variant="h2" align="center">Employees</Typography>
            </AppBar>
            <Grow in>
                <Container>
                    <Employees />
                </Container>
            </Grow>
        </Container>
    )
}

export default App;