import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import React from 'react';

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

function createKeyCaps() {
  const caps = [];
  const amount = 10;
  for (let i = 0; i < amount; i++) {
    caps.push(<KeyCap id={i} />);
  }
  return caps;
}
export default Footer;