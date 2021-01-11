import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Box,
} from '@chakra-ui/react';
import React from 'react';

import { keycapSize } from '../types';
import KeyCap from './keycap';

const Footer: React.FC = () => {
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
      <Tabs w="100%">
        <TabList>
          <Tab>キーキャップ</Tab>
          <Tab>PCB(基盤)</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box overflowX="scroll">
              <Flex justify="space-between" padding="1.5rem">
                {createKeyCaps()}
              </Flex>
            </Box>
          </TabPanel>
          <TabPanel>
            <Flex justify="space-between" overflowX="scroll" padding="1.5rem">
              {createKeyCaps()}
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

function createKeyCaps(): JSX.Element[] {
  return keycapSize.map((cap, index) => (
    <KeyCap key={index.toString()} _key={cap} size={cap} isDragedFromTab />
  ));
}
export default Footer;
