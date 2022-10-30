import React, { useState , useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getEmployee } from '../../../actions/employees';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Button from '../../Reusable/controls/Button';

export default function Employee() {
  const { employee, isLoading } = useSelector((state) => state.employees)
  const dispatch = useDispatch();
  let { id } = useParams()

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getEmployee(id));
  }, [id]);

  // const absences = employee.absence.map(item => {
  //   return <div>{item.reason}</div>
  // })

  console.log(employee)

  if(!employee) return null

  if(isLoading) return null

  return (
    <>
      <div>
        {employee.firstName}
        {employee.lastName}
      </div>
      <div>
        {/* {absences} */}
      </div>
    </>
  )
}
