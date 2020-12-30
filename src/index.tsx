import { ChakraProvider } from '@chakra-ui/react';
import { enableES5, enableMapSet } from 'immer';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from '../src/reducer';
import App from './app';

// enable immer
enableES5();
enableMapSet();

ReactDOM.render(
  <Provider store={store}>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </Provider>,
  document.getElementById('root')
);
