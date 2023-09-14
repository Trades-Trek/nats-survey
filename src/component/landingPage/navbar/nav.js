import { Box, Button, Flex, HStack, Image, Text } from '@chakra-ui/react';
import React from 'react';
import logo from 'public/images/landingPage/logo.svg';
import { FaTimes } from 'react-icons/fa';
import { HiMenu } from 'react-icons/hi';
import MobileNav from './mobileNav';

const Nav = ({ isSidebarOpen, toggleSideBar }) => {
  return (
    <>
      <Box>
        <Flex
          justifyContent={'space-between'}
          position={'relative'}
          top={'1rem'}
          width={'100%'}
          display={{ base: 'none', md: 'flex', lg: 'flex' }}
        >
          <Image src={logo} alt="logo" ml={'8rem'} />
          <HStack
            mr={'4.63rem'}
            gap={'2.5rem'}
            fontSize={'1.125rem'}
            fontWeight={600}
            letterSpacing={'0.01125rem'}
            color={'white'}
          >
            <Text>How it works</Text>
            <Text>Log In</Text>
            <Button
              width={'8.375rem'}
              h={'3.125rem'}
              backgroundColor={'white'}
              fontSize={'1.125rem'}
              fontWeight={600}
              letterSpacing={'0.01125rem'}
            >
              Sign Up
            </Button>
          </HStack>
        </Flex>

                                {/**********************************mobileNav*****************************************************/}

        <Flex
          justifyContent={'space-between'}
          position={'relative'}
          top={'2rem'}
          display={{base: "flex", md: "none", lg: "none"}}
        >
          <Text
            fontSize={'1.125rem'}
            fontWeight={'600'}
            color={'white'}
            ml={'2rem'}
          >
            Logo
          </Text>
          <Box mr={'2rem'} onClick={toggleSideBar}>
            {isSidebarOpen ? (
              <FaTimes fontSize={'2rem'} color={'white'} />
            ) : (
              <HiMenu fontSize={'2rem'} color={'white'} />
            )}
          </Box>
        </Flex>
        <MobileNav />
      </Box>
    </>
  );
};

export default Nav;
