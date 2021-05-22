import { Story, Meta } from '@storybook/react';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Footer from './footer';

export default {
  title: 'AirKey/components/Footer',
  component: Footer,
  decorators: [
    (Story): JSX.Element => (
      <DndProvider backend={HTML5Backend}>
        <Story />
      </DndProvider>
    ),
  ],
} as Meta;

export const Primary: Story<void> = () => <Footer />;
