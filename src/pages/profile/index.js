import { AuthContext } from 'src/context/AuthContext'
import React, { useContext } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayoutOther'
import CardWrapper from 'src/component/Cardwrapper'
import { Box, Button, CardContent, Typography } from '@mui/material'
import Router from 'next/router'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

const Profile = () => {
  const { userBankDetail, user } = useContext(AuthContext)
  const bankAccount = userBankDetail && userBankDetail.length ? userBankDetail[0] : null

  return (
    <CardWrapper HeaderComponent={<></>} title={''}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='h6' sx={{ color: 'black' }}>
            Profile
          </Typography>
        </Box>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {[
            { key: 'Name', value: user.name },
            { key: 'Username', value: user.username },
            { key: 'Email', value: user.email },
            { key: 'Phone', value: user.phone },
            { key: 'Country', value: user.country },
          ].map((value, index) => (
            <ListItem key={index + 1} disableGutters secondaryAction={<p>{value.value}</p>}>
              <ListItemText primary={`${value.key}`} />
            </ListItem>
          ))}
        </List>
   
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 20 }}>
          <Typography variant='h6' sx={{ color: 'black' }}>
            Bank Account Details
          </Typography>
        </Box>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {bankAccount ? (
            [
              { key: 'Bank Name', value: bankAccount.bankName },
              { key: 'Account Number', value: bankAccount.accountNumber },
              { key: 'Account Name', value: bankAccount.accountName },
            ].map((value, index) => (
              <ListItem key={index + 1} disableGutters secondaryAction={<p>{value.value}</p>}>
                <ListItemText primary={`${value.key}`} />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary='Bank account details not available' />
            </ListItem>
          )}
        </List>

        <Button
          onClick={() => {
            Router.replace('/profile/edit')
          }}
          type='submit'
          variant='contained'
          style={{ background: '#FF8C09', marginTop: 20 }}
        >
          Edit Profile
        </Button>
      </CardContent>
    </CardWrapper>
  )
}

Profile.getLayout = page => <BlankLayout>{page}</BlankLayout>
Profile.authGuard = true

export default Profile
