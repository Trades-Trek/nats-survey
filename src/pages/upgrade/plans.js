
import CardWrapper from 'src/component/Cardwrapper'
import BlankLayout from 'src/@core/layouts/BlankLayoutOther'

import Link from 'next/link'
import { useRouter } from 'next/router'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Box, Button, Grid, Typography } from '@mui/material'
import { useMediaQuery } from '@mui/material'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'

const SubList = () => (
  <List>
    <ListItem>
      <ListItemIcon>
        <CheckCircleOutlineOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary='Access to high-paying surveys' />
    </ListItem>

    <ListItem>
      <ListItemIcon>
        <CheckCircleOutlineOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary='Priority survey invitations' />
    </ListItem>

    <ListItem>
      <ListItemIcon>
        <CheckCircleOutlineOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary='Bonus earning activities' />
    </ListItem>

    <ListItem>
      <ListItemIcon>
        <CheckCircleOutlineOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary='Faster reward processing' />
    </ListItem>

    <ListItem>
      <ListItemIcon>
        <CheckCircleOutlineOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary='Personalized recommendations' />
    </ListItem>
  </List>
)

const SubscriptionCard = ({ title, price, features, upgradeButtonHref }) => {
    const router = useRouter()
  
return (
    <Grid item xs={12} sm={6} md={4}>
      <Box
        sx={{
          width: 392,
          height: 491,
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 2,
          background: '#FFF',
          boxShadow: '3px 8px 19px 0px rgba(0, 0, 0, 0.08)',
          textAlign: 'center'
        }}
      >
        <Typography variant='h5' style={{ fontWeight: '700', color: 'black'}}>{title}</Typography>
        <Typography variant='h5' style={{color: '#485583'}}>{price}</Typography>

        <SubList />

        {upgradeButtonHref ? (
          <Link href={upgradeButtonHref}>Upgrade</Link>
        ) : (
          <Button onClick={()=> {
            router.push('/upgrade/payment')
          }} variant='contained' sx={{ width: 200, background: '#FF8C09' }}>
            Upgrade
          </Button>
        )}
      </Box>
    </Grid>
  )
}

const UpgradePlans = () => {

  const isMobile = useMediaQuery('(max-width: 900px)')
  
return (
    <CardWrapper HeaderComponent={<></>} title=''>
      <Grid container spacing={isMobile ? 2 : 4}>
        <SubscriptionCard
          title='Basic'
          price='$500/month'
          features={['Access to high-paying surveys', 'Priority survey invitations', 'Bonus earning activities']}
          upgradeButtonHref='/upgrade/payment'
        />
        <SubscriptionCard
          title='Standard'
          price='$1000/month'
          features={[
            'Access to high-paying surveys',
            'Priority survey invitations',
            'Bonus earning activities',
            'Faster reward processing'
          ]}
          upgradeButtonHref=''
        />
        <SubscriptionCard
          title='Premium'
          price='$2000/month'
          features={[
            'Access to high-paying surveys',
            'Priority survey invitations',
            'Bonus earning activities',
            'Faster reward processing',
            'Personalized recommendations'
          ]}
          upgradeButtonHref='/upgrade/payment'
        />
      </Grid>
    </CardWrapper>
  )
}

UpgradePlans.getLayout = page => <BlankLayout>{page}</BlankLayout>
UpgradePlans.authGuard = true

export default UpgradePlans
