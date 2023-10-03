// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Link from 'next/link'
import BlankLayout from 'src/@core/layouts/BlankLayoutOther'
import { surveyService } from 'src/services/survey.service'
import React, { useState, useEffect, useContext } from 'react'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import { AuthContext } from 'src/context/AuthContext'

import CardImgTop from 'src/views/ui/cards/basic/CardImgTop'
import toast from 'react-hot-toast'
import Spinner from 'src/@core/components/spinner'

const TypographyCentered = ({ text }) => {
  return (
    <Typography variant='h6' component='div' sx={{ textAlign: 'center' }}>
      {text}
    </Typography>
  )
}

const NoSurveyAvailable = () => {
  return <TypographyCentered text='No survey available. Check back later.' />
}

const Dashboard = () => {
  const [surveys, setSurveys] = useState([])
  const [isLoading, setLoading] = useState(true)
  const { userBankDetail } = useContext(AuthContext)

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await surveyService.getAllSurveys();
        if (response.success) {
          setSurveys(response.data);
        } else {
         toast.error('Error while fetching surveys')
        }
      } catch (error) {
        toast.error('Error while fetching surveys')
      } finally {
        setLoading(false);
      }
    };

    fetchSurveys();
  }, []);

  if (isLoading && !surveys.length) {
    return <Spinner />;
  }

  return (
    <Grid
    container
    style={{ position: 'relative' }}
    spacing={6}
    sx={{ marginTop: 10, background: 'white', padding: 10 }}
  >
       {!userBankDetail && (
            <Card
              position='sticky'
              style={{ top: -60, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}
              sx={{ width: 395, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Link href='/setup'>
                {' '}
                <AccountBalanceIcon style={{ height: '12px' }} />
                <span>Setup your bank detail</span>{' '}
              </Link>
            </Card>
          )}

    <div style={{ textAlign: 'center', width: '100%' }}>
      {surveys.length > 0 ? (
        <>
          <Typography variant="h4" gutterBottom>
            Take 5 minute survey
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            Take survey from
          </Typography>
        </>
      ) : (
        <NoSurveyAvailable />
      )}
    </div>

    <Grid container spacing={6}>
      {surveys.map((survey) => (
        <Grid key={survey._id} item xs={12} sm={6} md={4}>
          <CardImgTop
            title={survey.title}
            description={survey.description}
            id={survey._id}
            slug={survey.slug}
            questions={survey.questions}
          />
        </Grid>
      ))}
    </Grid>
  </Grid>
  )
}

export default Dashboard

Dashboard.getLayout = page => <BlankLayout>{page}</BlankLayout>
Dashboard.authGuard = true
