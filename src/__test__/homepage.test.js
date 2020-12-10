import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import App from "../App";
import BusInfo from "pages/LandingPage/BusInfo";
import { act } from "react-dom/test-utils";

afterEach(cleanup);

describe("Tests if all components are being rendered and work as expected", () => {
  it(">>>> Whole App component should render correctly", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    act(() => {
      // Change the viewport to 500px.
      window.innerWidth = 500;
      window.innerHeight = 500;

      // Trigger the window resize event.
      // window.dispatchEvent(new Event('resize'))
      fireEvent(window, new Event("resize"));
    });
    ReactDOM.unmountComponentAtNode(div);
  });

  it(">>>> Should not display bus details without origin and destination set", () => {
    render(<App />);
    expect(screen.getByTestId("bus-info")).toBeEmptyDOMElement();
  });

  it(">>>> Navigation bar can be toggled", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId("menu-icon"));

    fireEvent.click(getByTestId("navbar-hide-icon"));

  });

  it(">>>> Dark and light map tilelayer should be toggled", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId("switch-btn"));
    expect(getByTestId("switch-btn")).toBeValid();
    
  });



  it(">>>> Search Panel can be toggled", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId("back-btn-search"));

    fireEvent.click(getByTestId("search-icon"));

  });

  it(">>>> Bus info toast is rendered correctly", () => {
    const { getByTestId } = render(<BusInfo data={{ origin: "test" }} />);

    expect(getByTestId("bus-info-toast")).toBeValid();
  });
});
