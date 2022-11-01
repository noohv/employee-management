import React, { useState , useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getEmployee, getEmployees } from '../../../actions/employees';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button } from '@mui/material';
import { createAbsence } from '../../../actions/employees';
import Popup from "../../Reusable/Popup";
import AbsenceForm from './AbsenceForm';


export default function Employee() {
  const { employee, isLoading } = useSelector((state) => state.employees)
  const [openPopup, setOpenPopup] = useState(false);
  const dispatch = useDispatch();
  let { id } = useParams()

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getEmployee(id));
  }, [id]);




  console.log(employee)

  if(!employee) return null

  if(isLoading) return null

  return (
    <>
      <div>
        {employee.firstName}
        {employee.lastName}
      </div>
    <Button
      onClick = {() => {
        setOpenPopup(true)
      }}
    >
      Pievienot
    </Button>

      <Container>
        {employee.absence.map(item => {
          return <div key={item._id}>{item.reason}</div>
        })}
      </Container>

      <Popup
        title="Pievienot prombūtni"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <AbsenceForm id={id} setOpenPopup={setOpenPopup}/>
      </Popup>
    </>
  )
}
