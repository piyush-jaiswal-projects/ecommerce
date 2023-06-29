import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './store'

import './index.css';

import App from './App';

import { Navbar } from './components'

import GetData from './api/getData';
GetData();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <Navbar />
    <App />
    </Provider>
  </React.StrictMode>
);