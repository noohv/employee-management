import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Container, Toolbar, Button, Avatar, Tooltip, IconButton, Typography, Box, Menu, MenuItem } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MenuIcon from '@mui/icons-material/Menu'
import { useDispatch } from 'react-redux';

export default function Navbar({ setNotify }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const [time, setTime] = useState(new Date())
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const dispatch = useDispatch()
  let navigate = useNavigate()
  let location = useLocation()

  // Function to handle burger menu openening
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  
  // Function to handle burger menu closing
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  // Function to handle user menu opening
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  // Function to handle user menu closing
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  // Log out the user ar navigate to Log In screen
  const logout = () => {
    dispatch({ type: 'LOG_OUT' })
    dispatch({ type: 'DESTROY_SESSION'})
    navigate("/auth", { replace: true })
    setNotify({ isOpen: true, message: "Atteikšanās no sistēmas veiksmīga!", type: 'success' })
    setUser(null)
    handleCloseUserMenu()
  }

  // Update current time when page location is changed, get user data from local storage
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')))
    setTime(new Date())
      if(time.toISOString() > user?.expDate) {
        window.location.reload(false)
        logout()
      }
  }, [location])

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* Navbar for small screens */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-controls="navbar-menu"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="secondary"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="navbar-menu"
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
              
                <MenuItem key='sakums' onClick={handleCloseNavMenu} component={Link}  to='/'>
                  <Typography>
                    Sākums
                  </Typography>
                </MenuItem>
              {user && 
              <div>
                <MenuItem key='darbinieki' onClick={handleCloseNavMenu} component={Link} to='/'>
                  <Typography>
                    Darbinieki
                  </Typography>
                </MenuItem>

                <MenuItem key='grafiki' onClick={handleCloseNavMenu} component={Link} to='/grafiki'>
                  <Typography>
                    Grafiki
                  </Typography>
                </MenuItem>

                <MenuItem key='amati' onClick={handleCloseNavMenu} component={Link} to='/amati'>
                  <Typography>
                    Amati
                  </Typography>
                </MenuItem>

                {user?.result.role === "admin" &&
                  <MenuItem key='admin' onClick={handleCloseNavMenu} component={Link} to='/admin'>
                    <Typography>
                      Admin
                    </Typography>
                  </MenuItem>
                }
              </div>
              }
  
            </Menu>
          </Box>

          {/* Navbar for medium to large screens*/}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <IconButton color='secondary' size='large' edge="start" component={Link}  to='/'>
              <HomeRoundedIcon />
            </IconButton>
            {user && 
              <>
                <Button sx={{ my: 2, ml: 5, display: 'block' }} color={location.pathname === '/' || location.pathname.includes("/darbinieki") ? "white" : "lightgray"} component={Link} to='/'>
                  <Typography variant='body2' sx={location.pathname === '/' || location.pathname.includes("/darbinieki") ? {fontWeight: 'bold'} : null}>
                    Darbinieki
                  </Typography>
                </Button>
                <Button sx={{ my: 2, display: 'block' }} color={location.pathname.includes("/grafiki") ? "white" : "lightgray"} component={Link} to='/grafiki'>
                  <Typography variant='body2' sx={location.pathname.includes("/grafiki") ? {fontWeight: 'bold'} : null}>
                    Grafiki
                  </Typography>
                </Button>
                <Button sx={{ my: 2, display: 'block' }} color={location.pathname.includes("/amati") ? "white" : "lightgray"} component={Link} to='/amati'>
                  <Typography variant='body2' sx={location.pathname.includes("/amati") ? {fontWeight: 'bold'} : null}>
                    Amati
                  </Typography>
                </Button>
              
                {user?.result.role === "admin" && 
                  <Button sx={{ my: 2, display: 'block' }} color={location.pathname.includes("/admin") ? "white" : "lightgray"} component={Link} to='/admin'>
                    <Typography variant='body2' sx={location.pathname.includes("/admin") ? {fontWeight: 'bold'} : null}>
                      Admin
                    </Typography>
                  </Button>
                }
             </>
            }
          </Box>

          {/* User menu */}
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
              id="navbar-menu"
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
