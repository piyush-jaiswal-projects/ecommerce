import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './store'

import './index.css';

import App from './App';

import { Navbar, Footer } from './components'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <Navbar />
      <App />
      <Footer />
    </Provider>
  </React.StrictMode>
);