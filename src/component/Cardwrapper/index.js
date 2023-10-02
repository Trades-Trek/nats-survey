import Card from '@mui/material/Card'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CardContent from '@mui/material/CardContent'
import { Typography } from '@mui/material'
import Router from "next/router";
import { AuthContext } from 'src/context/AuthContext'
import React, {  useContext } from 'react'

const CardWrapper = ({ HeaderComponent, title, children }) => {
  const { user  } = useContext(AuthContext);
  return (
    <Card sx={{ mt: 12, p: 5 }} style={{}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 25}}>
        <ArrowBackIcon style={{ cursor: 'pointer' }} onClick={()=>  Router.push( user ? '/dashboard' : '/')} />
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
