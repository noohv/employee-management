import React, { useEffect, useState } from "react";
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material'


import Employees from "./components/Employees/Employees";

const App = () => {


    return (
        <Container>
            <Grow in>
                <Container>
                    <Employees/>
                </Container>
            </Grow>
        </Container>
    )
}

export default App;