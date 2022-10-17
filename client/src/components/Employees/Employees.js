import React, {useState, useEffect } from 'react';
import EmployeesList from "./EmployeesList";
import { useDispatch } from "react-redux";

import { getEmployees } from '../../actions/employees';
export default function Employees() {

    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEmployees());
    }, [currentId,dispatch])


    return (
        <>
            <EmployeesList currentId={currentId} setCurrentId={setCurrentId} />
        </>
    )
}
