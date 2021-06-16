import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

let counter = 1;
ReactDOM.render(
    <App counter={counter}/>,
  document.getElementById('root')
);
