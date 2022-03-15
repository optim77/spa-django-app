import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../src'
import 'bootstrap/dist/css/bootstrap.css'
import reportWebVitals from '../../src/reportWebVitals';
import Header from '../../src/components/Header'

ReactDOM.render(
  <React.StrictMode>
    <App />
      <Header/>
      1
  </React.StrictMode>,
  document.getElementById('app')
);

reportWebVitals();
