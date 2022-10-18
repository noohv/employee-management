import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Container, Toolbar, Button, Typography, Avatar } from '@mui/material';

export default function Navbar() {
    const user = null;
    
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
                        <Button variant='contained'>Iziet</Button>
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
