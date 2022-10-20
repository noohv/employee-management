import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Container, Toolbar, Button, Typography, Avatar } from '@mui/material';
import { useDispatch } from 'react-redux';

export default function Navbar() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    let navigate = useNavigate();
    let location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOG_OUT' });
        navigate('/');
        setUser(null);
    }

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <AppBar position="static" sx={{mb:4}}>
            <Container maxWidth="xl">
            </Container>
            <Toolbar>
                {user ? (
                    <Container>
                        <Avatar alt={user.result.name} src={user.result.imageUrl}>
                            {user.result.name.charAt(0)}
                        </Avatar>
                        <Typography>
                            {user.result.name}
                        </Typography>
                        <Button onClick={logout} variant='contained'>Iziet</Button>
                    </Container>

                ) : (
                    <Button sx={{
                        bgcolor: 'white',
                        color: 'black',
                        '&:hover': {
                            bgcolor:'gray',
                            color: 'black'
                        }
                    }} component={Link} to='/auth'>
                        Ielogoties
                    </Button>
                )}

            </Toolbar>
        </AppBar>
    )
}
