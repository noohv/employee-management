import React from "react";
import Employee from "./Employee/Employee";

import useStyles from './styles';

const Employees = () => {
    const classes = useStyles();
    return (
        <>
            <h1>Empoyees</h1>
            <Employee />
            <Employee />
        </>
    );
}

export default Employees;