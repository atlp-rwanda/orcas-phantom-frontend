import React from 'react';
import ReactDOM from 'react-dom';
// import Enzyme, { shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
import contactPage from '../pages/contactPage/contact';
import aboutPage from '../pages/aboutPage/aboutPage';
import Faqs from '../pages/FAQpage/FAQPage';
import { cleanup } from '@testing-library/react';
// import Footer from '../components/site/Footer';
// import Navv from '../components/site/Nav';

// Enzyme.configure({adapter: new Adapter()});


afterEach(cleanup);


it ('>>>> should render all components', () => {
	const div = document.createElement('div');
    ReactDOM.render(<contactPage />, div);
    ReactDOM.unmountComponentAtNode(div);

	const div2 = document.createElement('div');
    ReactDOM.render(<aboutPage />, div2);
    ReactDOM.unmountComponentAtNode(div2);

	const div3 = document.createElement('div');
    ReactDOM.render(<Faqs />, div3);
    ReactDOM.unmountComponentAtNode(div3);
});


// it('should render heading of the Contact page', ()=>{
//   const wrapper= shallow(<Contact />);
//   const span=wrapper.find('span');
//   const result=span.text();
//   expect(result).toEqual('Contact Us');
// });
// it('should render heading of the about page', ()=>{
//   const wrapper= shallow(<About />);
//   const span=wrapper.find('span');
//   const result=span.text();
//   expect(result).toEqual('About Us');
// });
// it('should render heading of the FAQs page', ()=>{
//   const wrapper= shallow(<Faqs />);
//   const span=wrapper.find('span');
//   const result=span.text();
//   expect(result).toEqual('FAQs');
// });
// it('footer copy right', ()=>{
//   const wrapper= shallow(<Footer />);
//   const span=wrapper.find('span');
//   const result=span.text();
//   expect(result).toEqual('Phantom Ltd');
// });
// it('Check Logo ', ()=>{
//   const wrapper= shallow(<Navv />);
//   const h2=wrapper.find('h2');
//   const result=h2.text();
//   expect(result).toEqual('Phantom Ride');
// });

