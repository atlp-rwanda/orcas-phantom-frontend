import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import App, { Provider, stateForTest } from '../components/App';
import Nav from '../components/site/Nav';
import MapComponent from '../components/site/LandingPage/MapComponent';
import LandingPage from '../components/site/LandingPage/LandingPage';

afterEach(cleanup);

Enzyme.configure({ adapter: new Adapter() });

describe("Tests if all components are being rendered and work as expected", () => {
  it(">>>> Whole App component should render correctly", () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it(">>>> Landing page wrapper should render correctly", () => {
    render(
      <Provider value={stateForTest}>
        <LandingPage />
      </Provider>);
    expect(screen.getByTestId('homepage')).toBeValid();
  });

  it(">>>> Map renders correctly", () => {
    const { getByTestId } = render(<MapComponent lat={-1.9470658} lng={30.0915372}></MapComponent>);
    expect(getByTestId('map-component')).toBeValid();
  });

  it(">>>> Should not display bus details without clicking on search", () => {
    render(
      <Provider value={stateForTest}>
        <LandingPage />
      </Provider>);
    expect(screen.getByTestId('bus-info')).toBeEmptyDOMElement();
  });

  it(">>>> Clear button should remove all data", () => {
    const { getByTestId } = render(
      <Provider value={stateForTest}>
        <LandingPage />
      </Provider>);

    expect(getByTestId('origin').value).toMatch("");
    fireEvent.change(getByTestId('origin'), {target: {value: 'one'}});
    expect(getByTestId('origin').value).toMatch("one");

    expect(getByTestId('destination').value).toMatch("");
    fireEvent.change(getByTestId('destination'), {target: {value: 'two'}});
    expect(getByTestId('destination').value).toMatch("two");

    fireEvent.click(getByTestId("search-btn"));
    fireEvent.click(getByTestId("cancel-btn"));
    expect(screen.getByTestId('bus-info')).toBeEmptyDOMElement();
  });

  it(">>>> Navbar can be toggled", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId('menu-icon'));
  });

});

