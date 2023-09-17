// ** MUI Imports
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Image from 'next/image'
const FallbackSpinner = ({ sx }) => {
  // ** Hook
  const theme = useTheme()

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', height: '200px', width: '200px' }}>
        <Image
          src='/images/landingPage/logo.png' // Replace with the actual path to your image
          alt='Logo'
          width={100} // Set the desired width
          height={100} // Set the desired height
          layout='responsive' // Make the image responsive
        />
      </div>
      <CircularProgress disableShrink sx={{ mt: 6 }} />
    </Box>
  )
}

export default FallbackSpinner
