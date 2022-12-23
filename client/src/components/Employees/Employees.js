import React, { useEffect, useState } from 'react';
import EmployeesList from "./EmployeesList";
import { useDispatch, useSelector } from "react-redux";
import { Container } from '@mui/material';
import { getEmployees } from '../../actions/employees';
import { getJobTitles } from '../../actions/jobTitle'
import Stats from './Stats/Stats';

export default function Employees({ setNotify }) {
  const { data, error, success } = useSelector((state) => state.employees)
  const jobTitles = useSelector((state) => state.jobTitle)

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Darbinieku saraksts"
    dispatch(getEmployees()) // Get all employees
    dispatch(getJobTitles()) // Get all job titles
    
    if(error) {
      setNotify({ isOpen: true, message: error , type: 'error' }) // Set error notification information
      dispatch({type: 'CLEAR_EMPLOYEES_MESSAGE'}) // Clear Employee message from redux state
    }

    if(success) {
      setNotify({ isOpen: true, message: success , type: 'success' }) // Set success notification information
      dispatch({type: 'CLEAR_EMPLOYEES_MESSAGE'}) // Clear Employee message from redux state
    }
  }, [error, success])

  return (
    <Container>
      <Stats employees={data} /> 
      <EmployeesList 
        employees={data} 
        jobTitles={jobTitles} 
        setNotify={setNotify} 
      />
    </Container>
  )
}
