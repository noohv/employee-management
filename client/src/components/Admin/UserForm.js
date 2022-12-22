import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Grid, Container, FormControl, InputLabel, Select, MenuItem, FormHelperText  } from '@mui/material';
import Input from '../Reusable/AuthInput';
import { createUser } from  '../../actions/auth';
import { emailFormat, fieldRequired, matchingPasswords, passwordLength } from '../../Helpers/errorMessages'

export default function UserForm({ setOpenPopup }) {
  const roles = [{role: "user"}, {role: "admin"}]
  const initialData = { firstName:'', lastName:'', email:'', password:'', confirmPassword:'', role: '' }
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState(initialData)
  const [errors, setErrors] = useState({})

  const dispatch = useDispatch()

  // Form validation rules
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
    if('password' in fieldValues)
      temp.password = fieldValues.password ? fieldValues.password.length < 8 ? passwordLength : "" : fieldRequired
    if('confirmPassword' in fieldValues)
      temp.confirmPassword = fieldValues.confirmPassword !== formData.password ? matchingPasswords : fieldValues.confirmPassword ? "" : fieldRequired
    if('role' in fieldValues)
      temp.role = fieldValues.role ? "" : fieldRequired    

      setErrors({ ...temp })

    if(fieldValues === formData)
      return Object.values(temp).every(x => x === "")
  }

  // Show or hide password in input field
  const handleShowPassword = () => setShowPassword(prev => !prev)

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({ ...formData, [name]: value })
    validate({[name]: value})
  }

  // Hande form submit
  const handleSubmit = (e) => {
    e.preventDefault()

    if(validate()) {
      dispatch(createUser(formData))

      setOpenPopup(false)
      setFormData(initialData)
    }
  }

  const clear = () => { 
    setFormData(initialData) 
    setErrors({})
  }


  return (
    <Container sx={{ mt: 1 }} component='main' maxWidth='sm'>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1.5}>
          <Input name="firstName" label="Vārds" handleChange={handleChange} autoFocus half error={errors.firstName} />
          <Input name="lastName" label="Uzvārds" handleChange={handleChange} half error={errors.lastName} />
          <Input name="email" label="Epasta Adrese" handleChange={handleChange} type="text" error={errors.email} />
          <Input name="password" label="Parole" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} error={errors.password} />
          <Input name="confirmPassword" label="Apstiprināt paroli" handleChange={handleChange} type="password" error={errors.confirmPassword} />
          <Grid item xs={12}>
            <FormControl xs={12} fullWidth {...(errors?.role && {error:true})}>
              <InputLabel htmlFor="role">Loma</InputLabel>
              <Select labelId="role" label="Loma" name="role" onChange={handleChange} 
                value={formData.role} >
                {roles.map((item) => (
                  <MenuItem key={item.role} value={item.role}>{item.role === "admin" ? "Administrators" : "Lietotājs"}</MenuItem>
                ))}
              </Select>
              {errors?.role && <FormHelperText>{errors.role}</FormHelperText> }
            </FormControl>
          </Grid>
        </Grid>
        <Button sx={{mt: 3}} type="submit" color="secondary" variant='contained' fullWidth>
          Izveidot lietotāju
        </Button>
        <Button sx={{mt: 1}} variant="outlined" color="gray" size="small" onClick={() => {
          clear()
          setOpenPopup(false)}
          } fullWidth>Atcelt</Button>
      </form>
    </Container>
  )
}
