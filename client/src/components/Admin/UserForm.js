import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Container, Typography } from '@mui/material';
import Input from './UserInput';
import { createUser } from  '../../actions/auth';
import { emailFormat, fieldRequired, matchingPasswords, passwordLength } from '../../Helpers/errorMessages'
import Loader from '../Reusable/Loader';

export default function UserForm({ setNotify, setOpenPopup }) {
  const roles = ["user", "admin"]
  const initialData = { firstName:'', lastName:'', email:'', password:'', confirmPassword:'', role:'user' }
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState(initialData)
  const [errors, setErrors] = useState({})
  const { error, success, isLoading } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  const validate = (fieldValues = formData) => {
    let temp = {...errors}

    if('email' in fieldValues) 
      temp.email = fieldValues.email==="" ? fieldRequired : (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(fieldValues.email) ? "": emailFormat    
    if('password' in fieldValues)
      temp.password = fieldValues.password ? "" : fieldRequired
    if('firstName' in fieldValues)
      temp.firstName = fieldValues.firstName ? "" : fieldRequired
    if('lastName' in fieldValues)
      temp.lastName = fieldValues.lastName ? "" : fieldRequired
    if('password' in fieldValues) {
      temp.password = fieldValues.password ? "" : fieldRequired
      if(fieldValues.password.length < 8) temp.password = passwordLength
    }
    if('confirmPassword' in fieldValues)
      temp.confirmPassword = fieldValues.confirmPassword !== formData.password ? matchingPasswords : fieldValues.confirmPassword ? "" : fieldRequired

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
      dispatch(createUser(formData))
    }
  }

  const handleShowPassword = () => setShowPassword(prev => !prev)

  useEffect(() => {
    if(error) {
      setNotify({ isOpen: true, message: error , type: 'error' })
      dispatch({type: 'AUTH_CLEAR_ERROR', payload: null})
    }

    if(success) {
      setNotify({ isOpen: true, message: success , type: 'success' })
      dispatch({type: 'AUTH_CLEAR_ERROR', payload: null})
    } 
  }, [error, success])

  return (
    <Container sx={{ mt: 1 }} component='main' maxWidth='sm'>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Input name="firstName" label="Vārds" handleChange={handleChange} autoFocus half error={errors.firstName} />
          <Input name="lastName" label="Uzvārds" handleChange={handleChange} half error={errors.lastName} />
          <Input name="email" label="Epasta Adrese" handleChange={handleChange} type="text" error={errors.email} />
          <Input name="password" label="Parole" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} error={errors.password} />
          <Input name="confirmPassword" label="Apstiprināt paroli" handleChange={handleChange} type="password" error={errors.confirmPassword} />
        </Grid>
        <Button sx={{mt:2}} type="submit" color="secondary" variant='contained' fullWidth>
          Izveidot lietotāju
        </Button>
      </form>
      { isLoading && <Loader /> }
    </Container>
  )
}