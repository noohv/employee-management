import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { createAbsence } from '../../../actions/employees';

export default function AbsenceForm({id, setOpenPopup, types, error, success, setNotify}) {
  const initialData = { absenceType:'', startDate:'', endDate: ''}
  const [absenceData, setAbsenceData] = useState(initialData)
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()

  const validate = (fieldValues = absenceData) => {
    let temp = {...errors}

    if('absenceType' in fieldValues)
      temp.absenceType = fieldValues.absenceType.length != 0 ? "" : "Šis lauks ir obligāts"
    if('startDate' in fieldValues)
      temp.startDate =  fieldValues.startDate ? "": "Šis lauks ir obligāts"
    if('endDate' in fieldValues)
      temp.endDate = fieldValues.endDate < absenceData.startDate ? "Beigu datumam jābūt lielākam par sākuma datumu" : fieldValues.endDate ? "": "Šis lauks ir obligāts"

    setErrors({ ...temp })

    if(fieldValues == absenceData)
      return Object.values(temp).every(x => x == "")
  }

  const handleChange = (e) => {
      const { name, value } = e.target
      setAbsenceData({ ...absenceData, [name]:value })
      validate({[name]: value})
  }
    
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if(validate()) {
      dispatch(createAbsence(id,absenceData))
      setOpenPopup(false)
      clear()
    }
  }
  
  const clear = () => { 
    setAbsenceData(initialData) 
    setErrors({})
  }

  useEffect(()=> {
    if(error) {
      setNotify({ isOpen: true, message: error , type: 'error' })
      dispatch({type: 'CLEAR_EMPLOYEES_MESSAGE'})

    }
    if(success) {
      setNotify({ isOpen: true, message: success , type: 'success' })
      dispatch({type: 'CLEAR_EMPLOYEES_MESSAGE'})
    }

  }, [error, success])

  return (
    <form onSubmit={handleSubmit} autoComplete>
      <FormControl sx={{m:1}} fullWidth {...(errors?.absenceType && {error:true})}>
        <InputLabel htmlFor="absenceType">Veids</InputLabel>
        <Select labelId="absenceType" label="Veids" name="absenceType" onChange={handleChange} value={absenceData.absenceType}>
          {types.map((item) => (
            <MenuItem key={item.id} value={item.type}>{item.name}</MenuItem>
          ))}
        </Select>
        {errors?.absenceType && <FormHelperText>{errors.absenceType}</FormHelperText> }
      </FormControl>
      <TextField sx={{m:1}} name="startDate" variant="outlined" label="Sākuma datums" type="date" InputLabelProps={{shrink:true}} fullWidth value={absenceData.startDate.slice(0,10)} onChange={handleChange} {...(errors?.startDate && {error:true, helperText:errors.startDate})} />
      <TextField sx={{m:1}} name="endDate" variant="outlined" label="Beigu datums" type="date" InputLabelProps={{shrink:true}} fullWidth value={absenceData.endDate.slice(0,10)} onChange={handleChange} {...(errors?.endDate && {error:true, helperText:errors.endDate})} />
      <Button sx={{m:0.5}} variant="contained" color="primary" size="large" type="submit" fullWidth>Saglabāt</Button>
      <Button sx={{m:0.5}} variant="contained" color="secondary" size="small" onClick={() => {
        clear()
        setOpenPopup(false)}
        } fullWidth>Atcelt</Button>
    </form>
  )
}
