import { Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { decrement, increment } from '../reducer';
import { RootState } from '../types';
import Logo from './logo';

const Navigation: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();
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
      <Logo />
      <div>
        <span>{count}</span>
        {/* eslint-disable @typescript-eslint/explicit-function-return-type */}
        <Button onClick={() => dispatch(increment())}>+</Button>
        <Button onClick={() => dispatch(decrement())}>-</Button>
      </div>
      <Button backgroundColor="#4FC3F7" color="white" size="sm">
        使い方
      </Button>
    </Flex>
  );
};

export default Navigation;
