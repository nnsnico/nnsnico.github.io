import { Story, Meta } from '@storybook/react';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';

import { store } from '../../reducer';
import { keycapSize } from '../../types';
import RemovableKeycap, { RemovableKeycapProps } from './removableKeycap';

export default {
  title: 'AirKey/components/molecules/RemovableKeycap',
  components: RemovableKeycap,
  argTypes: {
    size: {
      control: { type: 'select', options: keycapSize },
      defaultValue: '1U',
    },
    _key: { control: 'number', defaultValue: 1 },
    selected: { control: 'boolean', defaultValue: false },
    position: { defaultValue: { x: 1, y: 1 } },
  },
  decorators: [
    (Story): JSX.Element => (
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
          <Story />
        </Provider>
      </DndProvider>
    ),
  ],
} as Meta;

export const Primary: Story<RemovableKeycapProps> = (args) => (
  <RemovableKeycap {...args} />
);
