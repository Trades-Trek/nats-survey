import {
  ChakraProvider,
  Box,
  theme,
  ColorModeScript
} from '@chakra-ui/react';
import LandingPage from 'src/component/landingPage';
import BlankLayout from 'src/@core/layouts/BlankLayout'

function Landing() {
  return (
  <>
    <ChakraProvider theme={theme}>
    <Box>
        <LandingPage />
      </Box>
    </ChakraProvider>
     <ColorModeScript />
    </>
  );
}

Landing.getLayout = page => <BlankLayout>{page}</BlankLayout>
Landing.guestGuard = true

export default Landing;