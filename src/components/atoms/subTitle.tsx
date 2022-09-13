import { Heading } from "@chakra-ui/react";
import React from "react";

interface SubTitleProps {
  children?: React.ReactNode
}

const SubTitle: React.FC<SubTitleProps> = ({ children }) => {
  return (
    <Heading size="md" textColor="gray.700" marginBottom="2">
      {children}
    </Heading>
  )
}

export default SubTitle;
