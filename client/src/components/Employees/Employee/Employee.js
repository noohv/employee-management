import React, { useState , useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getEmployee } from '../../../actions/employees';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function Employee() {
  const employee = useSelector((state) => state.employees.eventData);
  const dispatch = useDispatch();
  let { employeeId } = useParams()

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getEmployee(employeeId));
  }, []);

  console.log(employee)

  return (
    <div>
      <Link to="/">Contacts</Link>
      {employee.firstName} {employee.lastName}
    </div>
  )
}
