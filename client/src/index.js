import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './store'
import './index.css';
import App from './App';
import { Navbar, Footer, NetworkError } from './components'

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    {navigator.onLine
      ?
      <Provider store={store}>
        <Navbar />
        <App />
        <Footer />
      </Provider>
      :
      <NetworkError />
    }
  </React.StrictMode>
);