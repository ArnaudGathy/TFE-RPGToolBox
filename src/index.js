import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import App from './app';
import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/es/integration/react'
import {persistor, store} from './store/store'

ReactDOM.render((
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
), document.getElementById('root'))