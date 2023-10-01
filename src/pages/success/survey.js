// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardWrapper from 'src/component/Cardwrapper'
import BlankLayout from 'src/@core/layouts/BlankLayoutOther'

const SurveySuccess = () => {
  return (
    <CardWrapper HeaderComponent={<></>} title=''>
    <Grid container spacing={6}>
      <Grid item xs={12}>

   
          <CardContent>
            <Typography sx={{ mb: 2 }}>All the best for your new project.</Typography>
            <Typography>
          
            </Typography>
          </CardContent>

      </Grid>
    </Grid>
    </CardWrapper>
  )
}

SurveySuccess.getLayout = page => <BlankLayout>{page}</BlankLayout>
SurveySuccess.authGuard = true


export default SurveySuccess



// localStorage.setItem("new_survey_balance",