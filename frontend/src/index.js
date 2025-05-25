import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Mainly used just these two to style the entire site
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
