import React from 'react'
import { Avatar, Button, Grid, Container, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function Auth() {


    return (
        <Container component='main' maxWidth='xs'>
            <Avatar>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5"></Typography>
        </Container>
  )
}
