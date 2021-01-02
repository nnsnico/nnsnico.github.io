import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
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
      <Tabs>
        <TabList>
          <Tab>キーキャップ</Tab>
          <Tab>PCB(基盤)</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex justify="space-between" overflowX="scroll" padding="1.5rem">
              {createKeyCaps()}
            </Flex>
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
  const caps = [];
  const ids = keycapSize;
  for (const i of ids) {
    caps.push(<KeyCap key={i.toString()} _key={i} size={i} isDragedFromTab />);
  }
  return caps;
}
export default Footer;
