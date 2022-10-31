import React, { useState , useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getEmployee, getEmployeeAbsences } from '../../../actions/employees';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button } from '@mui/material';
import Popup from "../../Reusable/Popup";
import AbsenceForm from './AbsenceForm';


export default function Employee() {
  const { employee, isLoading } = useSelector((state) => state.employees)
  const [openPopup, setOpenPopup] = useState(false);
  const dispatch = useDispatch();
  let { id } = useParams()

  console.log(id)
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getEmployee(id));
  }, [id]);

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
  }}>
  Test
  </Button>

    <Popup
      title="Pievienot prombūtni"
      openPopup={openPopup}
      setOpenPopup={setOpenPopup}
    >
      <AbsenceForm  employee={employee} setEmployee id={id} />
    </Popup>




      <Container>
        { employee.absence.map(item => {
          return <div key={item._id}>{item.reason}</div>
        })}
      </Container>
    </>
  )
}
