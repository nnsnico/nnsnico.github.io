import { storiesOf } from '@storybook/react';
import React from 'react';
import { Provider } from 'react-redux';

import Navigation from '../components/navigation';
import { store } from '../reducer';

const component = storiesOf('AirKey/components', module);
component
  .addDecorator((story) => <Provider store={store}>{story()}</Provider>)
  .add('Navigation', () => <Navigation />);
