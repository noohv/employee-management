import React from "react";
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material'

import Employees from "./components/Employees/Employees";
import Form from "./components/Form/Form";
import logo from './images/logo.jpg';
import useStyles from './styles';

const App = () => {
    const classes = useStyles();

    return (
        <Container>
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">Employees</Typography>
                <img className={classes.image} src={logo} alt="logo" height="60" />
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