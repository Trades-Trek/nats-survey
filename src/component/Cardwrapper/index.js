import Card from '@mui/material/Card'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CardContent from '@mui/material/CardContent'
import { Typography } from '@mui/material'
import Router from 'next/router'
import { AuthContext } from 'src/context/AuthContext'
import React, { useContext } from 'react'
import jwt from 'jsonwebtoken'
import authConfig from 'src/configs/auth'

const CardWrapper = ({ HeaderComponent, title, children }) => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  const { user } = useContext(AuthContext)

  const redirect = () => {

    if (storedToken) {
      const {
        payload: { user_type }
      } = jwt.decode(storedToken, { complete: true })

      if (user_type === 'admin') {
        Router.push('/admin/hidden-auth-dashboard')
      } else {
        Router.push('/dashboard')
      }
    } else {
      Router.push('/')
    }
  }

  return (
    <Card sx={{ mt: 12, p: 5 }} style={{}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 25 }}>
        <ArrowBackIcon style={{ cursor: 'pointer' }} onClick={redirect} />
        {HeaderComponent}
      </div>

      <Typography variant='h5' style={{ textAlign: 'center', color: '#000000' }} component='h5'>
        {title}
      </Typography>

      <CardContent sx={{ px: 20 }}>{children}</CardContent>
    </Card>
  )
}

export default CardWrapper
