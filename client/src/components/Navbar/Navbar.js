import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Container, Toolbar, Button, Avatar, Tooltip, IconButton, Stack, Typography, Box, Menu, MenuItem,  } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MenuIcon from '@mui/icons-material/Menu'
import { useDispatch } from 'react-redux';

export default function Navbar({ setNotify }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const [time, setTime] = useState(new Date())
  const dispatch = useDispatch()
  let navigate = useNavigate()
  let location = useLocation()

  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const logout = () => {
    dispatch({ type: 'LOG_OUT' })
    dispatch({ type: 'DESTROY_SESSION'})
    navigate("/auth", { replace: true })
    setNotify({ isOpen: true, message: "Jūs tikāt izlogots no profila!", type: 'error' })
    setUser(null)
    handleCloseUserMenu()
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
    // <AppBar color='primary' position="static">
    //   <Toolbar sx={{display: 'flex', justifyContent:'space-between'}}>
    //     <Container sx={{m:0, display: 'flex', flexDirection:"row"}}>
          // <IconButton color='secondary' size='large' edge="start" component={Link}  to='/'>
          //   <HomeRoundedIcon />
          // </IconButton>
    //     {user && (
    //       <Stack sx={{ml:3}} direction='row' spacing={2}>
            // <Button variant='text' color={location.pathname === '/' || location.pathname.includes("/darbinieki") ? "white" : "lightgray"} component={Link} to='/'>
            //   <Typography variant='body2' sx={location.pathname === '/' || location.pathname.includes("/darbinieki") ? {fontWeight: 'bold'} : null}>
            //     Darbinieki
            //   </Typography>
            // </Button>
    //         <Button variant='text' color={location.pathname === '/grafiki' ? "white" : "lightgray"} component={Link} to='/grafiki'>
    //           <Typography variant='body2' sx={location.pathname === '/grafiki' ? {fontWeight: 'bold'} : null}>
    //             Grafiki
    //           </Typography>
    //         </Button>
    //         <Button variant='text' color={location.pathname === '/amati' ? "white" : "lightgray"} component={Link} to='/amati'>
    //           <Typography variant='body2' sx={location.pathname === '/amati' ? {fontWeight: 'bold'} : null}>
    //             Amati
    //           </Typography>
    //         </Button>
    //         {user?.result.role === "admin" && 
    //           <Button variant='text' color={location.pathname === '/admin' ? "white" : "lightgray"} component={Link} to='/admin'>
    //             <Typography variant='body2' sx={location.pathname === '/admin' ? {fontWeight: 'bold'} : null}>
    //               Admin
    //             </Typography>
    //           </Button>
    //         }
    //       </Stack>
    //     )}
    //     </Container>
    //     {user && (
    //       <Stack direction='row' spacing={2}>
    //         <Tooltip title={user.result.name}>
    //           <Avatar>
    //             {user.result.name.charAt(0)}
    //           </Avatar>
    //         </Tooltip>
    //         <IconButton color="secondary" onClick={logout}><LogoutIcon /></IconButton>
    //       </Stack>
    //     )}
    //   </Toolbar>
    // </AppBar>


    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              

                <MenuItem key='lapa1' onClick={handleCloseNavMenu} component={Link}  to='/'>
                  <Typography>
                    Sākums
                  </Typography>
                </MenuItem>

                <MenuItem key='lapa1' onClick={handleCloseNavMenu} component={Link} to='/'>
                  <Typography>
                    Darbinieki
                  </Typography>
                </MenuItem>

                <MenuItem key='lapa1' onClick={handleCloseNavMenu} component={Link} to='/grafiki'>
                  <Typography>
                    Grafiki
                  </Typography>
                </MenuItem>

                <MenuItem key='lapa1' onClick={handleCloseNavMenu} component={Link} to='/amati'>
                  <Typography>
                    Amati
                  </Typography>
                </MenuItem>

                <MenuItem key='lapa1' onClick={handleCloseNavMenu} component={Link} to='/admin'>
                  <Typography>
                    Admin
                  </Typography>
                </MenuItem>
  
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <IconButton color='secondary' size='large' edge="start" component={Link}  to='/'>
              <HomeRoundedIcon />
            </IconButton>
              <Button
                key='lapa1'
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Lapa1
              </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>

            {user && (
              <Tooltip title={user.result.name}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar>
                    {user.result.name.charAt(0)}
                  </Avatar>
                </IconButton>
              </Tooltip>
            )}

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem key='Logout' onClick={logout}>
                  <Typography textAlign="center">Iziet</Typography>
                </MenuItem>

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
