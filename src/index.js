import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './components/Nav';

const app = document.createElement('app');
ReactDOM.render(<Nav />, app);

const sampleFunction = (a, b) => a + b;

export default sampleFunction;
