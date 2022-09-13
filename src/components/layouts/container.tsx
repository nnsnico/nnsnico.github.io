import React from "react";
import { Flex } from '@chakra-ui/react';

export interface ContainerProps {
  children?: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <Flex backgroundColor="whiteAlpha.200" direction="column" padding="16">
      {children}
    </Flex>
  )
}

export default Container;
