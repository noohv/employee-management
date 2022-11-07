import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Container, Toolbar, Button, Avatar, Tooltip } from '@mui/material';
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
        <AppBar sx={{ bgcolor: '#01E08F', color: "#013870", mb:4}} position="static">

            <Toolbar>
                {user ? (
                    <Container sx={{display: 'flex', alignItems: 'center', justifyContent: 'end'}} >
                        <Tooltip title={user.result.name}>
                            <Avatar alt={user.result.name} src={user.result.imageUrl}>
                                {user.result.name.charAt(0)}
                            </Avatar>
                        </Tooltip>
                        <Button sx={{ m:1, color: '#013870', fontWeight: 'bold', borderRadius:0 }} onClick={logout} variant='text'>Iziet</Button>
                    </Container>
                ) : (
                    <Button sx={{
                        bgcolor: '#013870',
                        color: 'white',
                        '&:hover': {
                            bgcolor:'gray',
                            color: 'black'
                        }
                    }} component={Link} to='/auth'>
                        Ielogoties
                    </Button>
                )}

                <Button component={Link}  to='/schedules'>Grafiks</Button>
            </Toolbar>
        </AppBar>
    )
}
