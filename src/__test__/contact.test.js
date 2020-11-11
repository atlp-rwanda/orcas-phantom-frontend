import React from 'react';
import ReactDOM from 'react-dom';
import ContactPage from '../pages/contactPage/contact';
import AboutPage from '../pages/aboutPage/aboutPage';
import Faqs from '../pages/FAQpage/FAQPage';
import {  cleanup } from '@testing-library/react';

import ContextWrapper from 'context/AppProvider.js';



afterEach(cleanup);


it ('>>>> should render all components', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ContextWrapper><ContactPage /></ContextWrapper> ,div);
  ReactDOM.unmountComponentAtNode(div);

  const div2 = document.createElement('div');
  ReactDOM.render(<ContextWrapper><AboutPage /></ContextWrapper>, div2);
  ReactDOM.unmountComponentAtNode(div2);

  const div3 = document.createElement('div');
  ReactDOM.render(<ContextWrapper><Faqs /></ContextWrapper>, div3);
  ReactDOM.unmountComponentAtNode(div3);
  
  
});



