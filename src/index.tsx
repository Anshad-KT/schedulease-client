import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import './font.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';
import { persistor,Store } from './Redux/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={Store}>
    <PersistGate loading={null} persistor={persistor}>
      
    <App />
    </PersistGate>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
