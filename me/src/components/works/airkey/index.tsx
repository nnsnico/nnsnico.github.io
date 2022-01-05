import { Button } from '@chakra-ui/react';
import { RouteComponentProps } from '@reach/router';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Header from '../../header';
import Footer from './footer';
import KeyBoard from './keyboard';
import AirkeyLogo from './logo';

const Airkey: React.FC<RouteComponentProps> = () => {
  return (
    <div style={{ display: 'flex', flexFlow: 'column', height: '100vh' }}>
      <title>Airkey</title>
      <Header>
        <AirkeyLogo />
        <Button backgroundColor="#4FC3F7" color="white" size="sm">
          使い方(工事中)
        </Button>
      </Header>
      <DndProvider backend={HTML5Backend}>
        <KeyBoard />
        <Footer />
      </DndProvider>
    </div>
  );
};

export default Airkey;
