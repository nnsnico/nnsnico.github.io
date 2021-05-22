import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Footer from './components/footer';
import KeyBoard from './components/keyboard';
import Navigation from './components/navigation';

const App: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexFlow: 'column', height: '100vh' }}>
      <Navigation />
      <DndProvider backend={HTML5Backend}>
        <KeyBoard />
        <Footer />
      </DndProvider>
    </div>
  );
};

export default App;
