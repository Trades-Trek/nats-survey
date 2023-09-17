import { Box, Button, Flex, HStack, Image, Text } from '@chakra-ui/react'
import React from 'react'
import logo from 'public/images/landingPage/logo.svg'
import { FaTimes } from 'react-icons/fa'
import { HiMenu } from 'react-icons/hi'
import MobileNav from './mobileNav'
import Router from "next/router";


import Link from 'next/link'
import { styled, useTheme } from '@mui/material/styles'

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  fontSize: '1rem',
  alignItems: 'center',
  textDecoration: 'none',
  justifyContent: 'center',
  color: 'white'
}))

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
          <div style={{ width: '200px', height: '100px'}}>
          <Image
          src='/images/landingPage/logo.png' // Replace with the actual path to your image
          alt='Logo'

          // width={100} 
          // height={100} // Set the desired height
          layout='responsive'
        />
        </div>
          <HStack
            mr={'4.63rem'}
            gap={'2.5rem'}
            fontSize={'1.125rem'}
            fontWeight={600}
            letterSpacing={'0.01125rem'}
            color={'white'}
          >
            <LinkStyled href='#how-it-works'>How it works</LinkStyled>
        
            <LinkStyled href='/login'>
              <span> Login</span>
            </LinkStyled>

            <Button
              onClick={()=>  Router.push('/signup')} 
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
          display={{ base: 'flex', md: 'none', lg: 'none' }}
        >
          <Text fontSize={'1.125rem'} fontWeight={'600'} color={'white'} ml={'2rem'}>
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
  )
}

export default Nav
