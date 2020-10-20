import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup, fireEvent } from "@testing-library/react";
import AdminPage from "Dashboard/";

afterEach(cleanup);

describe("Tests if Admin Page renders and work as expected", () => {
  it(">>>> Whole Admin Page renders correctly", () => {
    const { getByTestId } = render(<AdminPage />);
    expect(getByTestId("admin-page")).toBeValid();
  });

  it(">>>> Components can be switched by clicking on side menu items", () => {
    const { getByTestId } = render(<AdminPage />);
    fireEvent.click(getByTestId("dashboard"));
    fireEvent.click(getByTestId("routes"));
    fireEvent.click(getByTestId("bus"));
    fireEvent.click(getByTestId("bus-stops"));
    fireEvent.click(getByTestId("users"));
    fireEvent.click(getByTestId("settings"));
  });

  it(">>>> Can switch back to dashboard by clicking on breadcrumb", () => {
    const { getByTestId } = render(<AdminPage />);
    fireEvent.click(getByTestId("dashboard-breadcrumb"));
  });
});
