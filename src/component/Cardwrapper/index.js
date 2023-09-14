import Card from '@mui/material/Card'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CardContent from '@mui/material/CardContent'
import { Typography } from '@mui/material'

const CardWrapper = ({ HeaderComponent, title, children }) => {
  return (
    <Card sx={{ mt: 12, p: 5 }} style={{}}>
      <div>
        <ArrowBackIcon style={{ cursor: 'pointer' }} />
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
