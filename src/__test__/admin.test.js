import 'jest';
import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { cleanup } from '@testing-library/react';
import Nav from '../components/site/Nav';
import AdminPage from '../components/admin/adminPage/AdminPage';
import AdminLogin from '../components/admin/loginPage/AdminLogin';
import NavAdmin from '../components/admin/NavAdmin';
import Message from '../components/admin/loginPage/message';
import firebase from 'firebase';

firebase.initializeApp = jest.fn();
afterEach(cleanup);
Enzyme.configure({adapter: new Adapter()});
const onSubmit=jest.fn();
test('to check Admin login if it has form element', () => {
  // Render a checkbox with label in the document
  const mProps = { history: { push: jest.fn() } };
  const checkbox = shallow(<AdminLogin password='12344' email='fiacregiraneza@gmail.com' {...mProps}/>);

  expect(checkbox.find('form').hasClass('form')).toEqual(true);
});
test('Submit works when credentials are true', async () => {
  const testValues = {
    email: 'Fiacre@gmail.com',
    password: '122',
   
  };
  
  const mProps = { history: { push: jest.fn() } };
  const checkbox = shallow(
    <AdminLogin onSubmit={onSubmit} {...mProps} email={testValues.email} password={testValues.password} />
  );
  checkbox.setState({email:testValues.email,password:testValues.password})
  expect(onSubmit).not.toHaveBeenCalled();
  checkbox.find('#email').simulate('change',{target:{value:testValues.email}});
  checkbox.find('#password').simulate('change',{target:{value:testValues.password}});
  checkbox.find('form').simulate('submit', { preventDefault: () => {} });
  expect(checkbox.state('password')).toBe('122');
  expect(checkbox.state('email')).toBe('Fiacre@gmail.com');
  expect(checkbox.state('status')).toBe('error');
      
});
test('Submit doesnot work when email is invalid', () => {
  const testValues = {
    email: 'Admin@gmail.com',
    password: '123456',
   
  };
  const mProps = { history: { push: jest.fn() } };
  const checkbox = shallow(
    <AdminLogin onSubmit={onSubmit} {...mProps} />
  );
  checkbox.setState({email:testValues.email,password:testValues.password})
  expect(onSubmit).not.toHaveBeenCalled();
  checkbox.find('#email').simulate('change',{target:{value:testValues.email}});
  checkbox.find('#password').simulate('change',{target:{value:testValues.password}});
  checkbox.find('form').simulate('submit', { preventDefault: () => {} });
  expect(checkbox.state('password')).toBe('');
  expect(checkbox.state('email')).toBe('');
  expect(checkbox.state('status')).toBe('submitted');
});

describe('check whole App', () => {
  it("renders without crashing", () => {
    shallow(<Nav />);
  });
  it("it has Admin Page", () => {
    const wrapper = shallow(<AdminPage />);
    const welcome = <h1>Hi <span role='img' aria-label="👋">👋</span> Admin</h1>;
    expect(wrapper.contains(welcome)).toEqual(true);
  });
  it("it has Admin login Page", () => {
    const mProps = { history: { push: jest.fn() } };
    const wrapper = shallow(<AdminLogin password='1234343' email='congs@yahoo.com' {...mProps}/>);
    const aboutMessage = 
            <div id='checkbox'><input type='checkbox' /><span> Remember me on this device</span></div>
    expect(wrapper.contains(aboutMessage)).toEqual(true);
  });
  it("Admin login Page has message layout ", () => {
    shallow(<Message message='' status='unauthorised'/>);
  });
  it("Admin login Page has message layout we have to cover whole lines of code ", () => {
    shallow(<Message message='' status='accepted1'/>);
  });
  it("Admin login Page has message layout we have to cover whole lines of code ", () => {
    shallow(<Message message='' status=''/>);
  });
  it("Admin login Page has Nav layout we have to cover whole lines of code ", () => {
    shallow(<NavAdmin />);
  });
});

