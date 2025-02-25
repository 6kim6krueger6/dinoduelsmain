import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PrivyProvider } from '@privy-io/react-auth';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <PrivyProvider
      appId={process.env.REACT_APP_PRIVY_APP_ID}
      onSuccess={(user) => console.log(`User ${user.id} logged in!`)}
    >
      <App />
    </PrivyProvider>

    
  </React.StrictMode>
);

reportWebVitals();
