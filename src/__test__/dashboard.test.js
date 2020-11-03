import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup, fireEvent } from "@testing-library/react";
import DashboardContextWrapper from "context/DashboardContext";
import AdminPage from "Dashboard/";
import ContentsWrapper from "Dashboard/components";

afterEach(cleanup);

describe("Tests if Admin Page renders and work as expected", () => {
  it(">>>> renders main wrapper", () => {
    render(
      <DashboardContextWrapper>
        <ContentsWrapper />
      </DashboardContextWrapper>
    );
  });

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
describe("Tests for bus section", () => {
  describe("Tests for table sorting and selecting", () => {
    it(">>>> can select all rows and unselect them", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("bus"));

      expect(getByTestId("select-all-rows")).toBeValid();
      fireEvent.click(getByTestId("select-all-rows"));

      expect(getByTestId("select-all-rows")).toBeValid();
      fireEvent.click(getByTestId("select-all-rows"));
    });
  });

  describe("Tests for table pagination", () => {
    it(">>>> can move to the next and last page", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("bus"));

      expect(getByTestId("next-page-btn")).toBeValid();
      expect(getByTestId("last-page-btn")).toBeValid();

      fireEvent.click(getByTestId("next-page-btn"));
      fireEvent.click(getByTestId("last-page-btn"));
    });

    it(">>>> can move to the previous and first page", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("bus"));

      expect(getByTestId("next-page-btn")).toBeValid();
      expect(getByTestId("last-page-btn")).toBeValid();

      fireEvent.click(getByTestId("next-page-btn"));
      fireEvent.click(getByTestId("last-page-btn"));

      expect(getByTestId("previous-page-btn")).toBeValid();
      expect(getByTestId("first-page-btn")).toBeValid();

      fireEvent.click(getByTestId("previous-page-btn"));
      fireEvent.click(getByTestId("first-page-btn"));
    });
  });
});
