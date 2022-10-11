import React, { useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material'
import { useDispatch } from "react-redux";

import { getEmployees } from './actions/employees';

import Employees from "./components/Employees/Employees";
import Form from "./components/Form/Form";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEmployees());
    }, [dispatch])

    return (
        <Container>
            <AppBar position="static" justify="space-between">
                <Typography variant="h2" align="center">Employees</Typography>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Employees />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App;