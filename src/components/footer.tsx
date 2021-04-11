import {
  Box,
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { PayloadAction } from '@reduxjs/toolkit';
import React, { Dispatch } from 'react';
import { useDispatch } from 'react-redux';

import { PCBId, PCBName } from '../pcb';
import { setPCBId } from '../reducer';
import { PCBIdPayload } from '../reducer/pcb';
import { keycapSize } from '../types';
import ISOEnterKeycap from './isoEnterKeycap';
import Keycap from './keycap';

const Footer: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <Flex
      w="100%"
      pos="fixed"
      bottom="0"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="white"
      style={{ zIndex: 1000 }}>
      <Tabs w="100%" minH="200px">
        <TabList>
          <Tab>PCB(基盤)</Tab>
          <Tab>キーキャップ</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box overflowX="scroll">
              <Flex justify="space-between" padding="1.5rem">
                {createPCBs(dispatch)}
              </Flex>
            </Box>
          </TabPanel>
          <TabPanel>
            <Flex justify="space-between" overflowX="scroll" padding="1.5rem">
              {createKeycaps()}
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

// FIXME: デザインなんとかして
function createPCBs(
  dispatch: Dispatch<PayloadAction<PCBIdPayload>>
): JSX.Element[] {
  return Object.entries(PCBName).map(([key, value]) => (
    <Button
      key={key}
      onClick={(): void => dispatch(setPCBId({ id: key as PCBId }))}>
      {value}
    </Button>
  ));
}

function createKeycaps(): (JSX.Element | null)[] {
  return keycapSize.map((cap, index) => {
    if (cap == 'ISOEnter_TOP') {
      return (
        <ISOEnterKeycap
          key={index.toString()}
          _key={cap}
          size={cap}
          isDragedFromTab
        />
      );
    } else if (cap != 'ISOEnter_BOTTOM') {
      return (
        <Keycap key={index.toString()} _key={cap} size={cap} isDragedFromTab />
      );
    } else {
      return null;
    }
  });
}
export default Footer;
