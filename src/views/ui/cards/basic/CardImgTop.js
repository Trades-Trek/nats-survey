// ** MUI Imports
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'

const buttonStyle = {
  margin: '10px auto',
  backgroundColor: '#FF8C09',
  padding: '12px', // You can adjust the padding as needed
  display: 'flex',
  justifyContent: 'center'
}

const CardImgTop = ({ title, description, slug, questions }) => {
  const router = useRouter()
  
return (
    <Card>
      <CardMedia sx={{ height: '14.5625rem' }} image='/images/landingPage/amazon.png' />
      <CardContent>
        <Typography variant='h6' sx={{ mb: 2 }}>
          {title}
        </Typography>
        <Typography variant='body2'>{description}</Typography>

        <Button
          onClick={() => {
            router.push(`survey/${slug}`)
          }}
          style={buttonStyle}
          variant='contained'
        >
          Take survey
        </Button>
      </CardContent>
    </Card>
  )
}

export default CardImgTop
