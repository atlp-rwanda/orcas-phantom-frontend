import Enzyme, { shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Contact from '../components/site/contactPage/contact';
import About from '../components/site/aboutPage/aboutPage'
import Faqs from '../components/site/FAQpage/FAQPage'
import Footer from '../components/site/Footer';
import Navv from '../components/site/Nav';

Enzyme.configure({adapter: new Adapter()});

it('should render heading of the Contact page', ()=>{
  const wrapper= shallow(<Contact />);
  const span=wrapper.find('span');
  const result=span.text();
  expect(result).toEqual('Contact Us');
});
it('should render heading of the about page', ()=>{
  const wrapper= shallow(<About />);
  const span=wrapper.find('span');
  const result=span.text();
  expect(result).toEqual('About Us');
});
it('should render heading of the FAQs page', ()=>{
  const wrapper= shallow(<Faqs />);
  const span=wrapper.find('span');
  const result=span.text();
  expect(result).toEqual('FAQs');
});
it('footer copy right', ()=>{
  const wrapper= shallow(<Footer />);
  const span=wrapper.find('span');
  const result=span.text();
  expect(result).toEqual('Phantom Ltd');
});
it('Check Logo ', ()=>{
  const wrapper= shallow(<Navv />);
  const h2=wrapper.find('h2');
  const result=h2.text();
  expect(result).toEqual('Phantom Ride');
});

