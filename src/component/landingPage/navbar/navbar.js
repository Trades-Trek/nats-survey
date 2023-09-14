import { useState } from 'react';
import React from 'react';
import Nav from './nav';
import { Box } from '@chakra-ui/react';
import MobileNav from './mobileNav';

function Navbar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSideBar = () => {
    setSidebarOpen(!isSidebarOpen);

      console.log('Sidebar is now:', isSidebarOpen ? 'open' : 'close');
  };

  return (
    <>
      <Box>
        <Nav isSidebarOpen={isSidebarOpen} toggleSideBar={toggleSideBar} />
        <MobileNav
          isSidebarOpen={isSidebarOpen}
          toggleSideBar={toggleSideBar}
        />
      </Box>
    </>
  );
}

export default Navbar;
