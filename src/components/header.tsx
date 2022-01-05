import { Flex } from '@chakra-ui/react';
import React from 'react';

const Header: React.FC = ({ children }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.0rem"
      bg="white"
      boxShadow="xl"
      style={{ zIndex: 1000 }}>
      {children}
    </Flex>
  );
};

export default Header;
