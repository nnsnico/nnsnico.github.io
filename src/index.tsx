import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from '../src/reducer';
import App from './app';

ReactDOM.render(
  <Provider store={store}>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </Provider>,
  document.getElementById('root')
);
