import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Grid, Container, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './Input';
import { signin, signup } from  '../../actions/auth';

export default function Auth() {

    const initialData = { firstName:'', lastName:'', email:'', password:'', confirmPassword:'' };

    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialData);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(isSignup) {
            dispatch(signup(formData, navigate))
        } else {
            dispatch(signin(formData, navigate))
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const switchMode = () => setIsSignup(prev => !prev);
    const handleShowPassword = () => setShowPassword(prev => !prev);

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
                                <Input name="lastName" label="Uzvārds" handleChange={handleChange} half />
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
                <Grid container justify="flex-end">
                    <Grid item>
                        <Button onClick={switchMode}>
                            { isSignup ? 'Ielogojies!' : 'Reģistrējies!' }
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
  )
}
