import { Box, Divider, List, ListItem } from '@chakra-ui/react';
import React from 'react';


function MobileNav({ isSidebarOpen }) {
  return (
    <>
      <Box
        className={
          isSidebarOpen ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }
        bg={isSidebarOpen ? 'white' : 'transparent'}
        position={'relative'}
        top={'4rem'}
        borderRadius={'0.5625rem'}
        width={'19.0625rem'}
      >
        {isSidebarOpen && (
          <List
            color={'#303136'}
            fontSize={'1.125rem'}
            fontWeight={'600'}
            height={'12.5625rem'}
            letterSpacing={'0.06188rem'}
            p={'2rem'}
          >
            <ListItem mb={'10px'}>How It Works</ListItem>
            <Divider mb={'10px'} />
            <ListItem mb={'10px'}>Log In</ListItem>
            <Divider mb={'10px'} />
            <ListItem>Sign Up</ListItem>
          </List>
        )}
      </Box>
    </>
  );
}

export default MobileNav;
