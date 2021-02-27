import { storiesOf } from '@storybook/react';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Footer from './footer';

const component = storiesOf('AirKey/components', module);
component
  .addDecorator((story) => (
    <DndProvider backend={HTML5Backend}>{story()}</DndProvider>
  ))
  .add('Footer', () => <Footer />);
