import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter} from "react-router-dom"
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Enzume, {mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import Faq from '../pages/FAQpage/Faqs'
import App from '../App';
import Sidebar from '../shared/components/SideBar'
import Nav from '../shared/components/Nav'
import ContextWrapper from 'context/AppProvider.js';


Enzume.configure({adapter: new Adapter() });

afterEach(cleanup);


describe("Tests if all components are being rendered and work as expected", () => {
  it(">>>> Whole App component should render correctly", () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  const toggleFaq = jest.fn
  const faq= {
    question: 'How accurate is the min calcuration ?',
    ansuer: 'None don\'t address hardware issue',
    open: false
  }
  let wrapper;
  beforeEach(()=>{
    wrapper = mount(<Faq faq={faq} toggleFaq={toggleFaq} />);
   
  })
  it("render ", () => {
    expect(wrapper).not.toBeNull(); 
  });
  
  it("switch Answers ", () => {
    const { getByTestId } = render(<Faq faq={faq} toggleFaq={toggleFaq} />);
    fireEvent.click(getByTestId("faqs"));
  });
  it(">>>> Side bar can be closed", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <ContextWrapper>
          <Sidebar />
        </ContextWrapper>
      </BrowserRouter>
    );

    fireEvent.click(getByTestId('back-btn1'));
    
  });
  it(">>>> Side bar can be toggled", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <ContextWrapper>
          <Nav />
        </ContextWrapper>
      </BrowserRouter>
    );

    fireEvent.click(getByTestId('menu-icon1'));
    
  });
 
})
