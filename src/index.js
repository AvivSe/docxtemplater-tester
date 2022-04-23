import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { ProvideUseFiles } from './hooks/useFiles';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProvideUseFiles>
      <App />
    </ProvideUseFiles>
  </React.StrictMode>
);
