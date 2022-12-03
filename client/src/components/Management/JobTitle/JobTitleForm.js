import React, { useState, useEffect } from "react";
import { Container, TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createJobTitle, updateJobTitle } from "../../../actions/jobTitle";


export default function Form({setOpenPopup, currentId, setNotify}) {
  const initialData = { name: '', description:''}
  const [jobTitleData, setJobTitleData] = useState(initialData)
  const { data, error, success } = useSelector(state => state.jobTitle)
  const dispatch = useDispatch()

  const handleChange = (e) => {
      const { name, value } = e.target
      setJobTitleData({ ...jobTitleData, [name]:value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if(currentId) {
      dispatch(updateJobTitle(currentId, jobTitleData))
    }
    else {
      dispatch(createJobTitle(jobTitleData));
    }

    setOpenPopup(false)
    clear()
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
        <TextField sx={{m:0.5}} name="name" variant="outlined" label="Nosaukums" fullWidth autoFocus required value={jobTitleData.name} onChange={handleChange} />
        <TextField sx={{m:0.5}} name="description" variant="outlined" label="Apraksts" multiline maxRows={4} minRows={4} fullWidth required value={jobTitleData.description} onChange={handleChange} />
        <Button sx={{m:0.5}} variant="contained" color="primary" size="large" type="submit" fullWidth>Saglabāt</Button>
        <Button sx={{m:0.5}} variant="contained" color="secondary" size="small" onClick={() => {
          clear()
          setOpenPopup(false)}
        } fullWidth>Atcelt</Button>
      </form>
    </Container>
  )
}