import { Heading } from "@chakra-ui/react";
import React from "react";

interface TitleProps {
  children?: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({ children }) => {
  return (
    <Heading textColor="gray.700" marginBottom="2">
      {children}
    </Heading>
  )
}

export default Title;
