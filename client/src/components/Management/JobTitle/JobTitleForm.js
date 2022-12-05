import React, { useState, useEffect } from "react";
import { Container, TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createJobTitle, updateJobTitle } from "../../../actions/jobTitle";


export default function Form({setOpenPopup, currentId, setNotify}) {
  const initialData = { name: '', description:''}
  const [jobTitleData, setJobTitleData] = useState(initialData)
  const { data, error, success } = useSelector(state => state.jobTitle)
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()

  const validate = (fieldValues = jobTitleData) => {
    let temp = {...errors}

    if('name' in fieldValues)
      temp.name = fieldValues.name ? "": "Šis lauks ir obligāts"
    if('description' in fieldValues)
      temp.description = fieldValues.description ? (fieldValues.description.length >250 ? "Apraksta maksimālais garums ir 250 rakstzīmes" : "") : "Šis lauks ir obligāts"

    setErrors({ ...temp })

    if(fieldValues == jobTitleData)
      return Object.values(temp).every(x => x == "")
  }

  const handleChange = (e) => {
      const { name, value } = e.target
      setJobTitleData({ ...jobTitleData, [name]: value })
      validate({[name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if(validate()) {
      if(currentId) {
        dispatch(updateJobTitle(currentId, jobTitleData))
      }
      else {
        dispatch(createJobTitle(jobTitleData));
      }
  
      setOpenPopup(false)
      clear()
    }
  }

  useEffect(() => {
    const jobTitle = data.find(item => item._id === currentId)
    if(jobTitle) setJobTitleData(jobTitle)

    if(error) {
      setNotify({ isOpen: true, message: error , type: 'error' })
      dispatch({type: 'CLEAR_JOBTITLE_MESSAGE'})
    }

    if(success) {
      setNotify({ isOpen: true, message: success , type: 'success' })
      dispatch({type: 'CLEAR_JOBTITLE_MESSAGE'})
    }
  }, [data, error, success])

  const clear = () => {
    setJobTitleData(initialData)
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField sx={{m:0.5}} name="name" variant="outlined" label="Nosaukums" fullWidth autoFocus 
          value={jobTitleData.name} onChange={handleChange} {...(errors?.name && {error:true, helperText:errors.name})} />
        <TextField sx={{m:0.5}} name="description" variant="outlined" label="Apraksts" multiline maxRows={4} minRows={4} fullWidth 
          value={jobTitleData.description} onChange={handleChange} {...(errors?.description && {error:true, helperText:errors.description})} />
        <Button sx={{m:1}} variant="contained" color="secondary" size="large" type="submit" fullWidth>Saglabāt</Button>
        <Button sx={{ml:1, mr:1, mt:0.5}} variant="outlined" color="gray" size="small" onClick={() => {
          clear()
          setOpenPopup(false)}
        } fullWidth>Atcelt</Button>
      </form>
    </Container>
  )
}