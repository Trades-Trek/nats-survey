// ** MUI Imports

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { AuthContext } from 'src/context/AuthContext'
import { useState, useContext } from 'react'

import CardContent from '@mui/material/CardContent'
import CardWrapper from 'src/component/Cardwrapper'
import BlankLayout from 'src/@core/layouts/BlankLayoutOther'
import { Button } from '@mui/material'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import Link from 'next/link'
import { useRouter } from 'next/router'

const SurveySuccess = () => {
  const { user } = useContext(AuthContext)
  const router = useRouter()

  const surveyBalance = router.query.s;

  if (!surveyBalance) {
    router.push('/dashboard');
  }

  return (
    <CardWrapper HeaderComponent={<></>} title=''>
      <Grid container spacing={6} sx={{ width: '30%', margin: '0 auto' }}>
        <Grid item xs={12}>
          <CardContent
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center'
            }}
          >
            <div style={{ height: '202px', width: '245px' }}>
              <img src='/images/pages/pana.png' alt='Pana image' />
            </div>

            <Typography variant='h5' sx={{ mt: 4 }}>
              {' '}
              <strong style={{ color: 'black' }}>Hurray, You've made {surveyBalance}</strong>
            </Typography>
            <Button
              onClick={() => {
                router.push(`/dashboard`)
              }}
              variant='contained'
              sx={{
                width: 220,
                p: 3,
                mt: 3,
                mb: 5,
                background: '#FF8C09',
                color: 'black',
                textTransform: 'capitalize'
              }}
            >
              Next Question <ArrowRightAltIcon />
            </Button>

            {user.subscriptionCategory === 'free' && (
              <div style={{ fontSize: '12px', margin: '10px' }}>
                <Link href='/upgrade/plans'>Upgrade to premium to earn more rewards.</Link>
              </div>
            )}

            <Typography>{/* Your content here */}</Typography>
          </CardContent>
        </Grid>
      </Grid>
    </CardWrapper>
  )
}

SurveySuccess.getLayout = page => <BlankLayout>{page}</BlankLayout>
SurveySuccess.authGuard = true

export default SurveySuccess
