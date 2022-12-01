import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Container, Toolbar, Button, Avatar, Tooltip, IconButton, Stack } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useDispatch } from 'react-redux';

export default function Navbar({ setNotify }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const [time, setTime] = useState(new Date())
  const dispatch = useDispatch()
  let navigate = useNavigate()
  let location = useLocation()

  const logout = () => {
    dispatch({ type: 'LOG_OUT' })
    dispatch({ type: 'DESTROY_SESSION'})
    navigate("/auth", { replace: true })
    setNotify({ isOpen: true, message: "Jūs tikāt izlogots no profila!", type: 'error' })
    setUser(null)
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')))
    setTime(new Date())
      if(time.toISOString() > user?.expDate) {
        window.location.reload(false)
        logout()
      }
  }, [location])

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
            <Button variant='outlined' color='secondary' component={Link}  to='/grafiki'>Grafiki</Button>
            <Button variant='outlined' color='secondary' component={Link}  to='/amati'>Amati</Button>
            <Tooltip title={user.result.name}>
              <Avatar alt={user.result.name} src={user.result.imageUrl}>
                {user.result.name.charAt(0)}
              </Avatar>
            </Tooltip>
            <IconButton color="secondary" onClick={logout}><LogoutIcon /></IconButton>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  )
}
