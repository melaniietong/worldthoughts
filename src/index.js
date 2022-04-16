import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './styles/_import';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ======== FETCHING ==================================
const temp = async() => {
  try {
    const response = await fetch("http://localhost:4000/polls");
    const jsonData = await response.json();
    console.log(jsonData);

  } catch (err) {
    console.error(err.message);
  }
}
temp();
// ====================================================