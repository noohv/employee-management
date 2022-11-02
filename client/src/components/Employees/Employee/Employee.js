import React, { useState , useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getEmployee, deleteEmployee } from '../../../actions/employees';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Typography, Divider } from '@mui/material';
import Popup from "../../Reusable/Popup";
import AbsenceForm from './AbsenceForm';
import AbsenceList from './AbsenceList';
import Form from '../../Form/Form';
import EmployeeSkeleton from './EmployeeSkeleton';

export default function Employee() {
  const { employee, isLoading } = useSelector((state) => state.employees)
  const [openPopup, setOpenPopup] = useState(false);
  const [popupType, setOpenPopupType] = useState();
  const dispatch = useDispatch();
  let { id } = useParams()

  console.log(isLoading)

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getEmployee(id));
  }, [id]);

  if(!employee) return null

  // Have to create Skeleton component for this
  const shortDate = (data) => {
    return data.slice(0,10);
  }

  const handleClick = () => {
    dispatch(deleteEmployee(id))
    navigate('/')
  }

  return (
    <>
    {!isLoading ?
    <> 
      <Button onClick={()=> navigate('/')}>Atpakaļ</Button>
      <Container sx={{display: 'flex', justifyContent: 'space-between'}}>
      <Container>
        <Typography variant='h4'>{`${employee.firstName} ${employee.lastName}`}</Typography>
        <Divider />
        <Typography sx={{mt:2}}><b>Epasts:</b> {employee.email}</Typography>
        <Typography><b>Tālr. nr:</b> {employee.phone}</Typography>
        <Typography><b>Adrese:</b> {employee.address}</Typography>
        <Typography><b>Sākšanas dat.:</b> {shortDate(employee.startDate)}</Typography>
      </Container>

      <Container sx={{display: 'flex', flexDirection: 'column'}}>
        <Button>Test</Button>
        <Button 
          onClick={() => {
              setOpenPopup(true)
              setOpenPopupType('employeeEdit')
          }}
        >
          Rediģēt </Button>
        <Button onClick={ handleClick }>Dzēst</Button>
      </Container>
    </Container>
      <Container>
        <Button
          onClick = {() => {
            setOpenPopup(true)
            setOpenPopupType('absence')
          }}>
          Pievienot
        </Button>

    {employee.absence.length === 0 ? 
      <Typography>Nav prombūtnes</Typography>
      :
        <AbsenceList absences={employee.absence}/>
      }
      </Container>

    
      <Popup
        title="Pievienot prombūtni"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
          {popupType==='absence' ?
            <AbsenceForm id={id} setOpenPopup={setOpenPopup}/>
           :
            <Form currentId={id} setOpenPopup={setOpenPopup} />
          }

      </Popup>
    </>
    :
     <EmployeeSkeleton />
    }
    </>
  )
}
