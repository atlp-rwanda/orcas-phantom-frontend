import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup, render } from "@testing-library/react";
import ErrorPage from "shared/components/ErrorPage";

afterEach(cleanup);

describe("Tests for Error page", () => {
  it(">>>> Error page renders correctly", () => {
    const { getByTestId } = render(<ErrorPage />);
    expect(getByTestId("error-page")).toBeValid();
  });
});
