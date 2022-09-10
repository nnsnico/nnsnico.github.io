import { Flex } from '@chakra-ui/react';
import React from 'react';

export interface HeaderProps {
  children?: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({ children }) => {
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
