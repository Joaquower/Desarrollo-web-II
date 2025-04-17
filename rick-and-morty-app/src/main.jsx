import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LikesProvider } from './context/LikesContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LikesProvider>
      <App />
    </LikesProvider>
  </React.StrictMode>
);
