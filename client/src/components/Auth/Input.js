import React from 'react'
import { TextField, Grid, InputAdornment, IconButton } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function Input({ name, half, label, handleChange, autoFocus, type, handleShowPassword }) {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField 
        name={name}
        type={type}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        InputProps={name === "password" ? {
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={handleShowPassword}>
                {type === "password" ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        } : null}
      />
    </Grid>
  )
}
