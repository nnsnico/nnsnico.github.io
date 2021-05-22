import { Story, Meta } from '@storybook/react';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';

import { store } from '../../reducer';
import { keycapSize } from '../../types';
import KeyFrame, { KeyFrameProps } from './keyframe';

export default {
  title: 'AirKey/components/atomic/KeyFrame',
  component: KeyFrame,
  argTypes: {
    pcbViewHeight: { control: 'number', defaultValue: 900 },
    pcbViewWidth: { control: 'number', defaultValue: 900 },
    keycapTotalSize: { control: 'number', defaultValue: 15 },
    position: { defaultValue: { x: 1, y: 1 } },
    size: {
      control: { type: 'select', options: keycapSize },
      defaultValue: '1U',
    },
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

export const Primary: Story<KeyFrameProps> = (args) => <KeyFrame {...args} />;
