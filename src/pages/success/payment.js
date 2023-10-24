// ** MUI Imports

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import CardContent from '@mui/material/CardContent'
import CardWrapper from 'src/component/Cardwrapper'
import BlankLayout from 'src/@core/layouts/BlankLayoutOther'
import { Button } from '@mui/material'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import Link from 'next/link'
import { useRouter } from 'next/router'

const PaymentSuccess = () => {
  const router = useRouter()


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
              <strong style={{ color: 'black' }}>Congratulations, You've <br/> upgraded your plan</strong>
            </Typography>
            <Button
            onClick={() => {
              router.push(`/dashboard`)
            }}
              variant='contained'
              sx={{ width: 220, p: 3, mt: 3, mb:5, background: '#FF8C09', color: 'black', textTransform: 'capitalize' }}
            >
              Start a survey <ArrowRightAltIcon />
            </Button>

            <Typography>{/* Your content here */}</Typography>
          </CardContent>
        </Grid>
      </Grid>
    </CardWrapper>
  )
}

PaymentSuccess.getLayout = page => <BlankLayout>{page}</BlankLayout>
PaymentSuccess.authGuard = true

export default PaymentSuccess

