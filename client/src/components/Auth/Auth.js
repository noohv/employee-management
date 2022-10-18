import React, { useState } from 'react'
import { Avatar, Button, Grid, Container, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './Input'

export default function Auth() {

    const isSignup = true;

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = () => {

    };

    const handleChange = () => {

    };


    const handleShowPassword = () => setShowPassword((prev) => !prev)

    return (
        <Container component='main' maxWidth='xs'>
            <Avatar>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">{isSignup ? 'Reģistrēties' : 'Ielogoties'}</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignup && (
                            <>
                                <Input name="firstName" label="Vārds" handleChange={handleChange} autoFocus half />
                                <Input name="firstName" label="Vārds" handleChange={handleChange} half />
                            </>
                        )
                    }
                    <Input name="email" label="Epasta Adrese" handleChange={handleChange} type="email" />
                    <Input name="password" label="Parole" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                    {isSignup && <Input name="confirmPassword" label="Atkārtota parole" handleChange={handleChange} type="password" />}
                </Grid>
                <Button type="submit" fullWidth variant='contained' >
                    {isSignup ? 'Reģistrēties' : 'Ielogoties'}
                </Button>
                <Grid>

                </Grid>
            </form>
        </Container>
  )
}
