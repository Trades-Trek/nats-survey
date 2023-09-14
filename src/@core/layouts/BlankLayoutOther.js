// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Button from '@mui/material/Button'

import MenuItem from '@mui/material/MenuItem'

import Hidden from '@mui/material/Hidden'

import { useState } from 'react'

import Drawer from '@mui/material/Drawer'

// Styled component for Blank Layout component
const BlankLayoutWrapper = styled(Box)(({ theme }) => ({
  height: '100vh',
  background: '#E6F2F2',

  // For V1 Blank layout pages
  '& .content-center': {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(5)
  },

  // For V2 Blank layout pages
  '& .content-right': {
    background: '#E6F2F2',
    display: 'flex',
    minHeight: '100vh',
    overflowX: 'hidden',
    position: 'relative'
  }
}))

const BlankLayout = ({ children }) => {
  return (
    <BlankLayoutWrapper className='layout-wrapper'>
      <Box className='app-content' sx={{
        background: '#E6F2F2',
         overflow: 'hidden', minHeight: '100vh', position: 'relative', padding: 15 }}>
        <ResponsiveAppBar />
        {children}
      </Box>
    </BlankLayoutWrapper>
  )
}

export default BlankLayout

function ResponsiveAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const router = useRouter()
  const currentPageName = router.pathname

  const UniqueButton = ({ title, route }) => (
    <Button
      onClick={() => {
        if (route) router.push(route)
      }}
      variant='contained'
      style={{ background: '#FF8C09' }}
    >
      {title}
    </Button>
  )

  const RightSideMenu = () => {
    if (currentPageName === '/signup') {
      return <UniqueButton title='Login' route='login' />
    }

    if (currentPageName === '/login') {
      return <UniqueButton title='Sign up' route='signup' />
    }

    if (currentPageName === '/otp') {
      return <UniqueButton title='Login' route='login' />
    }
    if (currentPageName === '/') {
      return <UniqueButton title='Login' route='login' />
    }

    return (
      <>
        {' '}
        <UniqueButton title='Hello world' />
        <IconButton
          size='large'
          aria-label='account of current user'
          aria-controls='menu-appbar'
          aria-haspopup='true'
          onClick={handleMenu}
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
      </>
    )
  }

  const appBarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#E6F2F2',
    color: 'black'
  }

  return (
    <div>
      <AppBar position='static' style={{ boxShadow: 'none' }}>
        <Toolbar style={appBarStyle}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='h6' component='div'>
              Logo
            </Typography>
          </div>

          {/* Buttons */}
          <Hidden mdDown>
            <div>
              <RightSideMenu />
            </div>
          </Hidden>

          {/* Hamburger Icon */}
          <Hidden mdUp>
            {/* Show the hamburger icon on screens smaller than 'md' (medium) */}
            <IconButton edge='end' color='inherit' aria-label='menu' onClick={handleMenu}>
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  )
}
