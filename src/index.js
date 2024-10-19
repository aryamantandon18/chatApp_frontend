import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {store} from './store'
import { Provider } from 'react-redux';
import { CssBaseline } from '@mui/material';
import {HelmetProvider} from 'react-helmet-async'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
      <CssBaseline/>
      <App />
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);

