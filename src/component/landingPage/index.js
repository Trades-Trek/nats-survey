import React from 'react';
import Header from './header';
import {
  Box,
  Flex,
  Image,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  UnorderedList,
  ListItem,
  Grid,
  Button,
} from '@chakra-ui/react';
import section2Image from 'public/images/landingPage/section2Image.png';
import { howItWorks } from './data';
import { faq } from './data';
import plus from 'public/images/landingPage/plus.svg';
import amazon from "public/images/landingPage/amazon.svg"
import visa from 'public/images/landingPage/visa.svg';
import ebay from 'public/images/landingPage/ebay.svg';
import expedia from 'public/images/landingPage/expedia.svg';
import square from 'public/images/landingPage/square.svg';
import connect from 'public/images/landingPage/connect.svg';
import bicycle from 'public/images/landingPage/bicycle.svg';
import Footer from './footer';


function LandingPage() {
  return (
    <>
      <Box>
        <Header />
        <Flex
          backgroundColor={'#E6F2F2'}
          w={'100%'}
          height={'auto'}
          gap={{ base: '2rem', lg: '6rem' }}
          flexDirection={{ base: 'column-reverse', lg: 'row' }}
        >
          <Box mt={{ base: '0rem', lg: '10rem' }}>
            <Image
              src={section2Image}
              w={{ base: '90%', lg: '30rem' }}
              height={{ base: '32rem', lg: '35rem' }}
              borderTopRadius={'1rem'}
              ml={{ base: '1rem', lg: '8rem' }}
            />
          </Box>

          <Box color={'#000'}>
            <Text
              fontSize={{ base: '1.875rem', lg: '2.25rem' }}
              fontWeight={{ base: '600', lg: '800' }}
              letterSpacing={{ base: '0.14063rem', lg: '0.16875rem' }}
              lineHeight={{ base: '2.11275rem', lg: '2.86156rem' }}
              w={{ base: '16.9375rem', lg: '32rem' }}
              mt={{ base: '2.75rem', lg: '12.56rem' }}
              ml={{ base: '1rem', lg: '0' }}
            >
              Empower Your Opinions: Join and Earn for Your Insights!
            </Text>
            <Text
              w={{ base: '20.5rem', lg: '35.6875rem' }}
              fontSize={{ base: '1rem', lg: '1.5rem' }}
              fontWeight={'400'}
              letterSpacing={{ base: '0.055rem', lg: '0.0825rem' }}
              mt={{ base: '1rem', lg: '2rem' }}
              ml={{ base: '1rem', lg: '0' }}
            >
              Our platform connects you with exciting survey opportunities that
              allow you to share your thoughts on a wide range of topics. By
              participating in surveys, you not only contribute to shaping the
              future but also earn rewards for your time and insights.
            </Text>
          </Box>
        </Flex>

        {/*******************************how it works section***************************************** */}

        <Box textAlign={'center'} backgroundColor={'white'}>
          <Text
            fontSize={{ base: '1.5rem', lg: '2.25rem' }}
            fontWeight={{ base: '600', lg: '800' }}
            letterSpacing={{ base: ' 0.1125rem', lg: '0.16875rem' }}
            lineHeight={{ base: '1.90775rem', lg: '2.86156rem' }}
            mt={{ base: '2.75rem', lg: '9.06rem' }}
            mb={{ base: '1rem', lg: '0.5rem' }}
          >
            How It Works
          </Text>
          <Text
            fontSize={{ base: '1rem', lg: '1.5rem' }}
            fontWeight={{ base: '400', lg: '400' }}
            letterSpacing={{ base: '0.055rem', lg: '0.0825rem' }}
            lineHeight={{ base: '1.28681rem', lg: '1.93025rem ' }}
            w={{ base: '17rem', lg: '30rem' }}
            m={'auto'}
          >
            Step-by-step guide on how users can participate in surveys and earn
            money
          </Text>
          <Flex
            justifyContent={'space-around'}
            mt={'3.88rem'}
            flexDirection={{ base: 'column', lg: 'row' }}
            mb={{ base: '0rem', lg: '9.06rem' }}
          >
            {howItWorks.map((item, index) => (
              <Box key={index} mb={{ base: '3rem', lg: '0' }}>
                <Image
                  src={item.Image}
                  w={{ base: '5.21281rem', lg: '7.73813rem' }}
                  height={{ base: '5.39875rem', lg: '8.01419rem' }}
                  ml={{ base: 'auto', lg: '1.5rem' }}
                  mr={{ base: 'auto', lg: '0' }}
                />
                <Text
                  fontSize={{ base: '1.6875rem', lg: '3.25rem' }}
                  fontWeight={{ base: '800', lg: '800' }}
                  letterSpacing={{ base: '0.12656rem;', lg: '0.24375rem' }}
                >
                  {item.steps}
                </Text>
                <Text
                  fontSize={{ base: '1rem', lg: '1.5rem' }}
                  fontWeight={{ base: '400', lg: '400' }}
                  letterSpacing={{ base: '0.055rem', lg: '0.0825rem' }}
                  width={{
                    base: index === howItWorks.length - 1 ? '40%' : '100%',
                    lg: index === howItWorks.length - 1 ? '15rem' : '10rem',
                  }}
                  m={{ base: 'auto', lg: '0' }}
                >
                  {item.text}
                </Text>
              </Box>
            ))}
          </Flex>
        </Box>

        {/********************************************************************FAQ****************************************************************/}
        <Box backgroundColor={'#F0F0F0'} height={'auto'} w={'100%'}>
          <Text
            fontSize={{ base: '1.5rem', lg: '2.25rem' }}
            fontWeight={{ base: '600', lg: '800' }}
            letterSpacing={{ base: ' 0.1125rem', lg: '0.16875rem' }}
            lineHeight={{ base: '1.90775rem', lg: '2.86156rem' }}
            w={{ base: '17.8125rem;', lg: '22.3125rem' }}
            textAlign={'center'}
            m={'auto'}
            pt={'4rem'}
          >
            Frequently Asked Question
          </Text>

          <Accordion
            allowToggle
            w={{ base: '20rem', lg: '45rem' }}
            m={'auto'}
            color={'black'}
            mt={'2rem'}
            pb={'4rem'}
          >
            {faq.map((item, index) => (
              <>
                <AccordionItem key={index} mt={'1rem'}>
                  <h2>
                    <AccordionButton
                      backgroundColor={'#FF8C09'}
                      borderRadius={'4.9375rem'}
                      p={{ base: '0.875rem 1.5625rem', lg: '1rem 4.6875rem' }}
                    >
                      <Text as="span" flex="1" textAlign="left">
                        {item.title}
                      </Text>
                      {/* <AccordionIcon /> */}
                      <Image src={plus} />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat. */}

                    <UnorderedList pl={4} spacing={2} paddingBlock={'1rem'}>
                      {item.list.map((item, index) => {
                        return <ListItem key={index}>{item}</ListItem>;
                      })}
                    </UnorderedList>
                  </AccordionPanel>
                </AccordionItem>
              </>
            ))}
          </Accordion>
        </Box>

        {/*********************************************************** partners ******************************************************/}

        <Box>
          <Text
            fontSize={{ base: '1.3125rem', lg: '2.25rem' }}
            fontWeight={{ base: '600', lg: '600' }}
            letterSpacing={{ base: '0.09844rem', lg: '0.16875rem' }}
            lineHeight={{ base: '1.55769rem ', lg: '2.86156rem ' }}
            w={{ base: '95%', lg: '56.75rem' }}
            textAlign={'center'}
            m={'auto'}
            pt={{ base: '4rem', lg: '9.5rem' }}
          >
            We Work with Some of the Most Respected Research Firms in the
            Industry
          </Text>
          <Flex
            justifyContent={'space-around'}
            gap={'3.94rem'}
            mt={{ base: 'auto', lg: '2.21rem' }}
            width={{ base: 'auto', lg: '70%' }}
            display={{ base: 'none', lg: 'flex' }}
            m={'auto'}
            mb={'8rem'}
          >
            <Image src={amazon} alt="Amazon" />
            <Image src={visa} alt="Visa" />
            <Image src={ebay} alt="ebay" />
            <Image src={expedia} alt="Expedia" />
          </Flex>
          <Grid
            display={{ base: 'grid', lg: 'none' }}
            gridTemplateColumns={'1fr 1fr'}
            width={'80%'}
            m={'auto'}
            mt={'2rem'}
            gap={'2rem'}
          >
            <Image src={amazon} alt="Amazon" w={'7.4375rem'} mt={'2rem'} />
            <Image src={square} alt="square" />
            <Image src={connect} alt="connect" />
            <Image src={bicycle} alt="bicycle" />
          </Grid>
        </Box>

        {/**********************************************************************your reward********************************************************/}

        <Box
          background={{
            base: '#10393B',
            lg: '#E6F2F2',
          }}
          w={{ base: '100%', lg: '100%' }}
          h={{ base: '95%', lg: 'auto' }}
        >
          <Text
            textAlign={'center'}
            fontSize={{ base: '1.25rem', lg: '2.25rem' }}
            fontWeight={{ base: '700', lg: '600' }}
            letterSpacing={{ base: '0.09844rem', lg: '0.16875rem' }}
            lineHeight={{ base: '1.55769rem ', lg: '2.86156rem  ' }}
            w={{ base: '90%', lg: '30.1875rem' }}
            pt={{ base: '4rem', lg: '3.25rem' }}
            m={'auto'}
            color={{ base: 'white', lg: 'black' }}
          >
            Your next reward is just a few clicks away!{' '}
          </Text>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={'2rem'}
            pb={'3rem'}
          >
            <Button
              background={'#FF8C09'}
              borderRadius={'0.3125rem'}
              p={'0.625rem'}
              w={'10.875rem'}
              fontSize={'1.25rem'}
              fontWeight={'400'}
            >
              Get Started
            </Button>
          </Box>
        </Box>
{/********************************************************************** footer **********************************************************/}
              <Footer/>
      </Box>
    </>
  );
}

export default LandingPage;
