import React, { useState , useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getEmployee, getEmployees } from '../../../actions/employees';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button } from '@mui/material';
import { createAbsence } from '../../../actions/employees';


export default function AbsenceForm({id, setOpenPopup}) {
    const initialData = { absenceType:'', startDate:'', endDate: '', reason:''}
    const [absenceData, setAbsenceData] = useState(initialData)
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target
    
        setAbsenceData({ ...absenceData, [name]:value })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createAbsence(id,absenceData));
        setOpenPopup(false);
        clear();
    }
    
    const clear = () => {
        setAbsenceData(initialData)
    }
  return (
    <form onSubmit={handleSubmit}>
        <TextField sx={{m:0.5}} name="absenceType" variant="outlined" label="Veids" fullWidth autoFocus required value={absenceData.absenceType} onChange={handleChange} />
        <TextField sx={{m:0.5}} name="startDate" variant="outlined" label="Sākuma datums" type="date" required InputLabelProps={{shrink:true}} fullWidth value={absenceData.startDate.slice(0,10)} onChange={handleChange} />
        <TextField sx={{m:0.5}} name="endDate" variant="outlined" label="Beigu datums" type="date" required InputLabelProps={{shrink:true}} fullWidth value={absenceData.endDate.slice(0,10)} onChange={handleChange} />
        <Button sx={{m:0.5}} variant="contained" color="primary" size="large" type="submit" fullWidth>Izveidot</Button>
    </form>
  )
}
