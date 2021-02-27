import { withKnobs, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Keycap from './keycap';

export default {
  component: Keycap,
  title: 'Keycap',
};

const component = storiesOf('AirKey/components', module);
component
  .addDecorator(withKnobs)
  .addDecorator((story) => (
    <DndProvider backend={HTML5Backend}>{story()}</DndProvider>
  ))
  .add('Keycap', () => <Keycap _key={text('_key', '1')} size={'1U'} />);
