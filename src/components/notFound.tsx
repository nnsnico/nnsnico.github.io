import { Flex, Heading, Link as LinkText, } from '@chakra-ui/react';
import { RouteComponentProps } from '@reach/router';
import React from 'react';
import { Link } from 'gatsby';
import Container from './layouts/container';

const NotFound: React.FC<RouteComponentProps> = () => (
  <Container>
    <Flex direction="column" align="center">
      <Heading>404: Not Found ¯\_(´ワ｀ )_/¯</Heading>
      <LinkText>
        <Link to="/">Back to website</Link>
      </LinkText>
    </Flex>
  </Container>
);

export default NotFound;
