import {
  Box,
  Text,
  Grid,
  List,
  ListItem,
  Flex,
  Divider,
  Image,
} from '@chakra-ui/react';
import React from 'react';
import instagram from 'public/images/landingPage/instagram.svg';
import twitter from 'public/images/landingPage/twitter.svg';
import youtube from 'public/images/landingPage/youtube.svg';
import mobileInsta from 'public/images/landingPage/mobileInsta.svg';
import mobileTwitter from 'public/images/landingPage/mobileTwitter.svg';
import mobileYoutube from 'public/images/landingPage/mobileYoutube.svg';

const Footer = () => {
  return (
    <>
      <Box color={'#FFF'}>
        <Box
          background={'#2D2D2D'}
          w={{ base: '100%', lg: '100%' }}
          h={{ base: '95%', lg: 'auto' }}
          fontSize={{ base: '0.875rem', lg: '1.125rem' }}
          letterSpacing={{ base: '0.09844rem', lg: '0.06188rem' }}
        >
          <List fontWeight={{ base: '500', lg: '500' }}>
            <Grid
              pt={{ base: '4rem', lg: '4.37rem' }}
              w={{ base: '80%', lg: '80%' }}
              m={'auto'}
              gridTemplateColumns={{
                base: '1fr 1fr',
                lg: '1fr 1fr 1fr 1fr 2fr',
              }}
              columnGap={'2rem'}
              rowGap={'1rem'}
            >
              <ListItem>About Us</ListItem>
              <ListItem order={{ base: 3, lg: 1 }}>Privacy Policy</ListItem>
              <ListItem order={{ base: 2, lg: 3 }}>Terms of Use</ListItem>
              <ListItem order={{ base: 3, lg: 3 }}>Cookies Settings</ListItem>
              <ListItem order={{ base: 4, lg: 5 }}>
                Do not sell my information
              </ListItem>
            </Grid>
          </List>
          <Divider w={'90%'} m={'auto'} mt={'3.19rem'} h={'1rem'} />

          <Box
            display="flex"
            flexDir={'column'}
            justifyContent="center"
            alignItems="center"
            mt={'2rem'}
            pb={'3rem'}
          >
            <Text
              fontWeight={{ base: '400', lg: '500' }}
              fontSize={{ base: '0.625rem', lg: '1.125rem' }}
              letterSpacing={{ base: '0.03438rem', lg: '0.06188rem' }}
            >
              © Copyright |Company Name|. 2023. All Rights Reserved.
            </Text>
            <Flex
              mt={'2rem'}
              gap={'2rem'}
              color={'yellow'}
              display={{ base: 'none', lg: 'flex' }}
            >
              <Image src={instagram} alt="Instagram" />
              <Image src={twitter} alt="Twitter" />
              <Image src={youtube} alt="youTube" />
            </Flex>

            <Flex
              mt={'2rem'}
              gap={'2rem'}
              color={'yellow'}
              display={{ base: 'flex', lg: 'none' }}
            >
              <Image src={mobileInsta} alt="Instagram" />
              <Image src={mobileTwitter} alt="Twitter" />
              <Image src={mobileYoutube} alt="youTube" />
            </Flex>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
