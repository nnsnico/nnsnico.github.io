import React from 'react';
import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';

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
      bg="white">
      <Tabs>
        <TabList>
          <Tab>キーキャップ</Tab>
          <Tab>BBC</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default Footer;
