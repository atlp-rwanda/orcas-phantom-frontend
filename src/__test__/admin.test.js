import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import AdminPage from "Dashboard/";
import AdminLogin from "../pages/admin/loginPage/AdminLogin";
import Enzyme, { mount } from "enzyme";
import history from "../browserHistory";
import App from "../App";
import Adapter from "enzyme-adapter-react-16";
import "@testing-library/jest-dom/extend-expect";
import { cleanup, render, fireEvent } from "@testing-library/react";
import ContextWrapper from "context/AppProvider.js";
import PrivateRoute from "../App/PrivateRoute";
import PrivateLogin from "../App/PrivateLogin";

Enzyme.configure({ adapter: new Adapter() });
afterEach(cleanup);
describe("Tests if all components are being rendered and work as expected", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });
  it(">>>> should render all components of Admin Page if we are not authenticated", () => {
    const props = { path: "/AdminPage", component: AdminPage };

    mount(
      <Router history={history}>
        <PrivateRoute authenticated={false} ownProps={props} />
      </Router>
    );
  });
  it(">>>> should render all components of Admin Page if we are not authenticated", () => {
    mount(
      <Router history={history}>
        <PrivateLogin
          exact
          path="/AdminLogin"
          component={AdminLogin}
          authenticated={true}
        />
      </Router>
    );
  });
  it(">>>> should render all components of Admin Page if we are authenticated", () => {
    const props = { path: "/AdminPage", component: AdminPage };

    mount(
      <Router history={history}>
        <PrivateRoute authenticated={true} ownProps={props} />
      </Router>
    );
  });
  it(">>>> should check private routes", () => {
    const history = createMemoryHistory();
    history.push("/AdminPage");
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it(">>>> should check private routes", () => {
    const history = createMemoryHistory();
    history.push("/AdminLogin");
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it(">>>> Input boxes are working", () => {
    const { getByTestId } = render(
      <ContextWrapper>
        <AdminLogin />
      </ContextWrapper>
    );

    fireEvent.change(getByTestId("email"), {
      target: { value: "Admin@gmail.com" },
    });
    expect(getByTestId("email").value).toMatch("Admin@gmail.com");

    fireEvent.change(getByTestId("password"), { target: { value: "123456" } });
    expect(getByTestId("password").value).toMatch("123456");

    fireEvent.change(getByTestId("email"), { target: { value: "" } });
    expect(getByTestId("email").value).toMatch("");

    fireEvent.change(getByTestId("password"), { target: { value: "" } });
    expect(getByTestId("password").value).toMatch("");
  });
  it(">>>> test for login", () => {
    const { getByTestId } = render(
      <ContextWrapper>
        <AdminLogin />
      </ContextWrapper>
    );

    fireEvent.change(getByTestId("email"), {
      target: { value: "Admin@gmail.com" },
    });
    expect(getByTestId("email").value).toMatch("Admin@gmail.com");

    fireEvent.change(getByTestId("password"), { target: { value: "123456" } });
    expect(getByTestId("password").value).toMatch("123456");

    fireEvent.click(getByTestId("submit-btn"));
  });
  it(">>>> test for login for unauthorized user", () => {
    const { getByTestId } = render(
      <ContextWrapper>
        <AdminLogin />
      </ContextWrapper>
    );

    fireEvent.change(getByTestId("email"), {
      target: { value: "Admin1@gmail.com" },
    });
    expect(getByTestId("email").value).toMatch("Admin1@gmail.com");

    fireEvent.change(getByTestId("password"), { target: { value: "123456" } });
    expect(getByTestId("password").value).toMatch("123456");

    fireEvent.click(getByTestId("submit-btn"));
  });
  it(">>>> test for login for authorized user", () => {
    const { getByTestId } = render(
      <ContextWrapper>
        <AdminLogin />
      </ContextWrapper>
    );

    fireEvent.change(getByTestId("email"), {
      target: { value: "gunner@gmail.com" },
    });
    expect(getByTestId("email").value).toMatch("gunner@gmail.com");

    fireEvent.change(getByTestId("password"), { target: { value: "111111" } });
    expect(getByTestId("password").value).toMatch("111111");

    fireEvent.click(getByTestId("submit-btn"));
  });
  it(">>>> test for login for invalid password", () => {
    const { getByTestId } = render(
      <ContextWrapper>
        <AdminLogin />
      </ContextWrapper>
    );

    fireEvent.change(getByTestId("email"), {
      target: { value: "Admin1@gmail.com" },
    });
    expect(getByTestId("email").value).toMatch("Admin1@gmail.com");

    fireEvent.change(getByTestId("password"), { target: { value: "123" } });
    expect(getByTestId("password").value).toMatch("123");

    fireEvent.click(getByTestId("submit-btn"));
  });
});
