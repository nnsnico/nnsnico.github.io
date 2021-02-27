import { text, boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';

import { store } from '../../reducer';
import RemovableKeycap from './removableKeycap';

const component = storiesOf('AirKey/components/molecules', module);
component
  .addDecorator(withKnobs)
  .addDecorator((story) => (
    <DndProvider backend={HTML5Backend}>{story()}</DndProvider>
  ))
  .addDecorator((story) => <Provider store={store}>{story()}</Provider>)
  .add('RemovableKeycap', () => (
    <RemovableKeycap
      size={'1U'}
      _key={text('_key', '1')}
      selected={boolean('selected', false)}
      position={{ x: 1, y: 1 }}
    />
  ));
