import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { createAbsence } from '../../../actions/employees';

export default function AbsenceForm({id, setOpenPopup, types}) {
  const initialData = { absenceType:'', startDate:'', endDate: '', reason:'', absenceType:''}
  const [absenceData, setAbsenceData] = useState(initialData)
  const dispatch = useDispatch()

  const handleChange = (e) => {
      const { name, value } = e.target
      setAbsenceData({ ...absenceData, [name]:value })
  }
    
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createAbsence(id,absenceData))
    setOpenPopup(false)
    clear()
  }
    
  const clear = () => { setAbsenceData(initialData) }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl sx={{m:0.5}} required fullWidth>
        <InputLabel htmlFor="absenceType">Veids</InputLabel>
        <Select labelId="absenceType" label="Veids" name="absenceType" onChange={handleChange} value={absenceData.absenceType}>
          {types.map((item) => (
            <MenuItem key={item.id} value={item.type}>{item.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField sx={{m:0.5}} name="startDate" variant="outlined" label="Sākuma datums" type="date" required InputLabelProps={{shrink:true}} fullWidth value={absenceData.startDate.slice(0,10)} onChange={handleChange} />
      <TextField sx={{m:0.5}} name="endDate" variant="outlined" label="Beigu datums" type="date" required InputLabelProps={{shrink:true}} fullWidth value={absenceData.endDate.slice(0,10)} onChange={handleChange} />
      <Button sx={{m:0.5}} variant="contained" color="primary" size="large" type="submit" fullWidth>Izveidot</Button>
    </form>
  )
}
