import {
  Center,
  Flex,
  Heading,
  HStack,
  Link as LinkText,
  VStack,
} from '@chakra-ui/react';
import { RouteComponentProps } from '@reach/router';
import React from 'react';
import { Link } from 'gatsby';

const NotFound: React.FC<RouteComponentProps> = () => (
  <Flex direction="column" align="center">
    <Heading>404: Not Found</Heading>
    <LinkText>
      <Link to="/">Back to home page</Link>
    </LinkText>
  </Flex>
);

export default NotFound;
