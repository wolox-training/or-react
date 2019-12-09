import React from 'react';
import ReactDOM from 'react-dom';
import App from '@screens/App';
import store from '@redux/store';
import { Provider } from 'react-redux';

import './scss/index.scss';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
