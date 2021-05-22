import { Story, Meta } from '@storybook/react';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { keycapSize } from '../types';
import Keycap, { KeycapProps } from './keycap';

export default {
  title: 'AirKey/components/Keycap',
  component: Keycap,
  argTypes: {
    _key: { control: 'number', defaultValue: 1 },
    size: {
      control: { type: 'select', options: keycapSize },
      defaultValue: '1U',
    },
  },
  decorators: [
    (Story): JSX.Element => (
      <DndProvider backend={HTML5Backend}>
        <Story />
      </DndProvider>
    ),
  ],
} as Meta;

export const Primary: Story<KeycapProps> = (args) => <Keycap {...args} />;
