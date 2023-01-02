import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText, Container } from '@mui/material';
import { createAbsence, updateAbsence } from '../../../actions/employees';
import { fieldRequired, endDateLargerThanStartDate } from '../../../Helpers/errorMessages'

export default function AbsenceForm({ id, setOpenPopup, types, currentId, absences }) {
  const initialData = { absenceType:'', startDate:'', endDate: ''}
  const [absenceData, setAbsenceData] = useState(initialData)
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()

  // Absence form validation
  const validate = (fieldValues = absenceData) => {
    let temp = {...errors}

    if('absenceType' in fieldValues)
      temp.absenceType = fieldValues.absenceType.length !== 0 ? "" : fieldRequired
    if('startDate' in fieldValues)
      temp.startDate =  fieldValues.startDate ? "": fieldRequired
    if('endDate' in fieldValues)
      temp.endDate = fieldValues.endDate < absenceData.startDate ? endDateLargerThanStartDate : fieldValues.endDate ? "": fieldRequired

    setErrors({ ...temp })

    if(fieldValues === absenceData)
      return Object.values(temp).every(x => x === "")
  }

  // Handle input field data change
  const handleChange = (e) => {
      const { name, value } = e.target
      setAbsenceData({ ...absenceData, [name]:value })
      validate({[name]: value})
  }
    
  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault() // Prevent page from reloading
    
    if(validate()) {
      if(currentId) {
        dispatch(updateAbsence(currentId, id, absenceData))
      }
      else {
        dispatch(createAbsence(id, absenceData))
      }
      setOpenPopup(false) // Close form popup
      clear()
    }
  }
  
  // Clear absence data state and errors
  const clear = () => { 
    setAbsenceData(initialData) 
    setErrors({})
  }

  useEffect(() => {
    if(currentId) {
      setAbsenceData(absences.find(i => i._id === currentId))
    } 
  }, [currentId])

  return (
    <Container>
      <form onSubmit={handleSubmit} autoComplete="off">
        <FormControl sx={{mt: 1}} fullWidth {...(errors?.absenceType && {error:true})}>
          <InputLabel htmlFor="absenceType">Veids</InputLabel>
          <Select labelId="absenceType" label="Veids" name="absenceType" onChange={handleChange} value={absenceData.absenceType}>
            {types.map((item) => (
              <MenuItem key={item.id} value={item.type}>{item.name}</MenuItem>
            ))}
          </Select>
          {errors?.absenceType && <FormHelperText>{errors.absenceType}</FormHelperText> }
        </FormControl>
        <TextField sx={{mt: 1.5}} name="startDate" variant="outlined" label="Sākuma datums" type="date" InputLabelProps={{shrink:true}} fullWidth 
          value={absenceData.startDate.slice(0,10)} onChange={handleChange} {...(errors?.startDate && {error:true, helperText:errors.startDate})} />
        <TextField sx={{mt: 1.5}} name="endDate" variant="outlined" label="Beigu datums" type="date" InputLabelProps={{shrink:true}} fullWidth 
          value={absenceData.endDate.slice(0,10)} onChange={handleChange} {...(errors?.endDate && {error:true, helperText:errors.endDate})} />
        <Button sx={{mt: 3}} variant="contained" color="secondary" size="large" type="submit" fullWidth>Saglabāt</Button>
        <Button sx={{mt: 1}} variant="outlined" color="gray" size="small" onClick={() => {
          clear()
          setOpenPopup(false)}
          } fullWidth>Atcelt</Button>
      </form>
    </Container>
  )
}
