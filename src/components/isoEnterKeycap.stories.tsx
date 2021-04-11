import { Meta, Story } from '@storybook/react';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { keycapSize } from '../types';
import ISOEnterKeycap, { ISOEnterKeycapProps } from './isoEnterKeycap';

export default {
  title: 'AirKey/components/ISOEnterKeycap',
  component: ISOEnterKeycap,
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

export const Primary: Story<ISOEnterKeycapProps> = (args) => (
  <ISOEnterKeycap {...args} />
);
