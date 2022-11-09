import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Container, Toolbar, Button, Avatar, Tooltip, IconButton, Stack } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useDispatch } from 'react-redux';

export default function Navbar() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    let navigate = useNavigate();
    let location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOG_OUT' });
        navigate("/auth", { replace: true })
        setUser(null);
    }

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <AppBar color='primary' position="static">
            <Toolbar sx={{display: 'flex', justifyContent:'space-between'}}>
                <Container>
                    <IconButton color='secondary' size='large' edge="start" component={Link}  to='/'>
                        <HomeRoundedIcon />
                    </IconButton>
                </Container>
                {user && (
                    <Stack direction='row' spacing={2}>
                        <Button color='secondary' component={Link}  to='/schedules'>Grafiks</Button>
                        <IconButton color="secondary" onClick={logout}><LogoutIcon /></IconButton>
                        <Tooltip title={user.result.name}>
                            <Avatar alt={user.result.name} src={user.result.imageUrl}>
                                {user.result.name.charAt(0)}
                            </Avatar>
                        </Tooltip>
                    </Stack>
                )}
            </Toolbar>
        </AppBar>
    )
}
