import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Grid, Container, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from '../Reusable/AuthInput';
import { signin } from  '../../actions/auth';
import { emailFormat, fieldRequired } from '../../Helpers/errorMessages'
import Loader from '../Reusable/Loader';

export default function Auth({ setNotify }) {
  const initialData = {email:'', password:'' }
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState(initialData)
  const [errors, setErrors] = useState({})
  const { error, success, isLoading } = useSelector(state => state.auth)

  const dispatch = useDispatch()
  let navigate = useNavigate()

  const validate = (fieldValues = formData) => {
    let temp = {...errors}

    if('email' in fieldValues) 
      temp.email = fieldValues.email==="" ? fieldRequired : (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(fieldValues.email) ? "": emailFormat    
    if('password' in fieldValues)
      temp.password = fieldValues.password ? "" : fieldRequired

    setErrors({ ...temp })

    if(fieldValues === formData)
      return Object.values(temp).every(x => x === "")
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({ ...formData, [name]: value })
    validate({[name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if(validate()) {
      dispatch(signin(formData, navigate))
    }
  }

  const handleShowPassword = () => setShowPassword(prev => !prev)

  useEffect(() => {
    if(error) {
      setNotify({ isOpen: true, message: error , type: 'error' })
      dispatch({type: 'AUTH_CLEAR_MESSAGE', payload: null})
    }

    if(success) {
      setNotify({ isOpen: true, message: success , type: 'success' })
      dispatch({type: 'AUTH_CLEAR_MESSAGE', payload: null})
    } 

    document.title = "Pievienoties sistēmai"
  }, [error, success])

  return (
    <Container sx={ {mt:10 }} component='main' maxWidth='sm'>
      <Container sx={{ display:'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center' }}>
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography sx={{ mb:2 }} variant="h5">Ielogoties</Typography>
      </Container>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Input name="email" label="Epasta Adrese" handleChange={handleChange} type="text" error={errors.email} />
          <Input name="password" label="Parole" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} error={errors.password} />
        </Grid>
        <Button sx={{mt:2}} type="submit" color="secondary" variant='contained' fullWidth>
          Pieteikties
        </Button>
      </form>
      { isLoading && <Loader /> }
    </Container>
  )
}
