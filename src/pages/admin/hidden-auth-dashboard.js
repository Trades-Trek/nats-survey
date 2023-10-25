import Grid from '@mui/material/Grid'
import BlankLayout from 'src/@core/layouts/BlankLayoutOther'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'

const AdminDashboard = () => {
  const router = useRouter()
  return (
    <Grid
      container
      style={{ position: 'relative' }}
      spacing={6}
      sx={{ marginTop: 10, background: 'white', padding: 10, justifyContent: 'space-between' }}
    >
      <Button color='primary' variant='contained'
      onClick={()=> {
        router.push('/admin/newsurvey')
      }}
      >
        Create Survey
      </Button>

      <Button color='primary' variant='contained'
      onClick={()=> {
        router.push('/admin/newsurvey')
      }}
      >
        Restrict survey
      </Button>


      <Button color='primary' variant='contained' 
         onClick={()=> {
          router.push('/admin/withdrawalrequest')
        }}
      >
        User withdrawal request
      </Button>

      {/* <Button color='primary' variant='contained'>
        Completed users transaction
      </Button> */}
    </Grid>
  )
}

export default AdminDashboard

AdminDashboard.getLayout = page => <BlankLayout>{page}</BlankLayout>
AdminDashboard.adminGuard = true
