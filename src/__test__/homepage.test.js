import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import App from '../App';
import MapComponent from '../pages/LandingPage/MapComponent';
import BusInfo from 'pages/LandingPage/BusInfo';

afterEach(cleanup);

describe("Tests if all components are being rendered and work as expected", () => {
  it(">>>> Whole App component should render correctly", () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it(">>>> Map renders correctly", () => {
    const { getByTestId } = render(<MapComponent lat={-1.9470658} lng={30.0915372}></MapComponent>);
    expect(getByTestId('map-component')).toBeValid();
  });

  it(">>>> Should not display bus details without origin and destination set", () => {
    render(<App />);
    expect(screen.getByTestId('bus-info')).toBeEmptyDOMElement();
  });

  it(">>>> Input boxes are working", () => {
    const { getByTestId } = render(<App />);

    fireEvent.change(getByTestId('origin'), {target: {value: 'Remera 1'}});
    expect(getByTestId('origin').value).toMatch("Remera 1");

    fireEvent.change(getByTestId('destination'), {target: {value: 'Kacyiru'}});
    expect(getByTestId('destination').value).toMatch('Kacyiru');

    fireEvent.change(getByTestId('origin'), {target: {value: ''}});
    expect(getByTestId('origin').value).toMatch('');

    fireEvent.change(getByTestId('destination'), {target: {value: ''}});
    expect(getByTestId('destination').value).toMatch('');

  });

  it(">>>> Navigation bar can be toggled", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId('menu-icon'));

    fireEvent.click(getByTestId('navbar-hide-icon'));
    
  });

  it(">>>> Search Panel can be toggled", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId('back-btn-search'));

    fireEvent.click(getByTestId('search-icon'));
  });

  it(">>>> Bus info toast is rendered correctly", () => {
    const { getByTestId } = render(<BusInfo data={{origin: "test"}}/>);

    expect(getByTestId('bus-info-toast')).toBeValid();
  });
});

