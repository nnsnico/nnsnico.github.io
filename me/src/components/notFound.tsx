import { Center, Flex, Heading, Link as LinkText } from '@chakra-ui/react';
import { RouteComponentProps } from '@reach/router';
import React from 'react';
import { Link } from 'gatsby';

const NotFound: React.FC<RouteComponentProps> = () => (
  <Center>
    <Flex direction="column" align="center">
      <Heading>404: Not Found</Heading>
      <LinkText>
        <Link to="/">Back to home page</Link>
      </LinkText>
    </Flex>
  </Center>
);

export default NotFound;
