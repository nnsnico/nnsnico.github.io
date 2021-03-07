import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Provider } from 'react-redux';

import Navigation from '../components/navigation';
import { store } from '../reducer';

export default {
  title: 'AirKey/components/Navigation',
  component: Navigation,
  decorators: [
    (Story): JSX.Element => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
  parameters: {
    controls: { disabled: true },
  },
} as Meta;

export const Primary: Story<void> = () => <Navigation />;
