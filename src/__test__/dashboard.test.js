import React from "react";
import "@testing-library/jest-dom/extend-expect";
import DashboardContextWrapper from "context/DashboardContext";
import { render, cleanup, fireEvent, within } from "@testing-library/react";
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

  it(">>> can untoggle and toggle back the side menu", () => {
    const { getByTestId } = render(<AdminPage />);
    fireEvent.click(getByTestId("sidemenu-toggler"));

    fireEvent.click(getByTestId("sidemenu-toggler-mobile"));
  });
});

describe("Tests for Routes section", () => {
  describe("Tests for table sorting and selecting", () => {
    it(">>>> can select all rows and unselect them", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("routes"));

      expect(getByTestId("select-all-rows")).toBeValid();
      fireEvent.click(getByTestId("select-all-rows"));

      expect(getByTestId("select-all-rows")).toBeValid();
      fireEvent.click(getByTestId("select-all-rows"));
    });

    it(">>>> can sort rows by characters", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("routes"));
      expect(getByTestId("sort-by-char")).toBeValid();
      fireEvent.click(getByTestId("sort-by-char"));
    });
    it(">>>> can sort rows by numbers", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("routes"));
      expect(getByTestId("sort-by-numbers")).toBeValid();
      fireEvent.click(getByTestId("sort-by-numbers"));
    });
    it(">>>> can expand a row and collapse it", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("routes"));

      expect(getByTestId("expand-row-btn")).toBeValid();
      fireEvent.click(getByTestId("expand-row-btn"));

      expect(getByTestId("expand-row-btn")).toBeValid();
      fireEvent.click(getByTestId("expand-row-btn"));
    });
  });

  describe("Tests for table pagination", () => {
    it(">>>> can move to the next and last page", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("routes"));

      expect(getByTestId("next-page-btn")).toBeValid();
      expect(getByTestId("last-page-btn")).toBeValid();

      fireEvent.click(getByTestId("next-page-btn"));
      fireEvent.click(getByTestId("last-page-btn"));
    });

    it(">>>> can move to the previous and first page", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("routes"));

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

  // create route modal
  describe("Tests for create route modal", () => {
    it(">>>> Can open create route modal correctly", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("routes"));
      expect(getByTestId("open-create-modal")).toBeValid();
      fireEvent.click(getByTestId("open-create-modal"));
    });

    it(">>>> Can open and cancel create route modal correctly", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("routes"));
      expect(getByTestId("open-create-modal")).toBeValid();
      fireEvent.click(getByTestId("open-create-modal"));

      expect(getByTestId("cancel-create-route-btn")).toBeValid();
      fireEvent.click(getByTestId("cancel-create-route-btn"));
    });

    it(">>>> Can open the create route modal correctly and NOT submit the form with empty fields", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("routes"));
      expect(getByTestId("open-create-modal")).toBeValid();
      fireEvent.click(getByTestId("open-create-modal"));

      expect(getByTestId("create-route-btn")).toBeValid();
      fireEvent.click(getByTestId("create-route-btn"));

      expect(getByTestId("cancel-create-route-btn")).toBeValid();
    });

    it(">>>> Can open and NOT create a route from the modal with same start location and destination", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("routes"));

      expect(getByTestId("open-create-modal")).toBeValid();
      fireEvent.click(getByTestId("open-create-modal"));

      fireEvent.change(getByTestId("route-code-create"), {
        target: { value: "Kimironko - Kacyiru" },
      });
      expect(getByTestId("route-code-create").value).toMatch(
        "Kimironko - Kacyiru"
      );

      fireEvent.change(getByTestId("route-length-create"), {
        target: { value: "8km" },
      });
      expect(getByTestId("route-length-create").value).toMatch("8km");

      fireEvent.change(getByTestId("assigned-buses-create"), {
        target: { value: 10 },
      });
      expect(getByTestId("assigned-buses-create").value).toMatch("10");

      fireEvent.change(getByTestId("start-loc-create"), {
        target: { value: 1.12 },
      });
      expect(getByTestId("start-loc-create").value).toMatch("1.12");

      fireEvent.change(getByTestId("dest-loc-create"), {
        target: { value: 1.12 },
      });
      expect(getByTestId("dest-loc-create").value).toMatch("1.12");

      fireEvent.change(getByTestId("add-bus-stp-cr"), {
        target: { value: "Camp Kigali" },
      });
      expect(getByTestId("add-bus-stp-cr").value).toMatch("Camp Kigali");

      fireEvent.click(getByTestId("create-route-btn"));

      expect(getByTestId("create-route-btn")).toBeValid();
      expect(getByTestId("cancel-create-route-btn")).toBeValid();
      fireEvent.click(getByTestId("cancel-create-route-btn"));
    });

    it(">>>> Can open and create a route from the modal", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("routes"));

      expect(getByTestId("open-create-modal")).toBeValid();
      fireEvent.click(getByTestId("open-create-modal"));

      fireEvent.change(getByTestId("route-code-create"), {
        target: { value: "Kimironko - Kacyiru" },
      });
      expect(getByTestId("route-code-create").value).toMatch(
        "Kimironko - Kacyiru"
      );

      fireEvent.change(getByTestId("route-length-create"), {
        target: { value: "8km" },
      });
      expect(getByTestId("route-length-create").value).toMatch("8km");

      fireEvent.change(getByTestId("assigned-buses-create"), {
        target: { value: 10 },
      });
      expect(getByTestId("assigned-buses-create").value).toMatch("10");

      fireEvent.change(getByTestId("start-loc-create"), {
        target: { value: 1.12 },
      });
      expect(getByTestId("start-loc-create").value).toMatch("1.12");

      fireEvent.change(getByTestId("dest-loc-create"), {
        target: { value: 30.05 },
      });
      expect(getByTestId("dest-loc-create").value).toMatch("30.05");

      fireEvent.change(getByTestId("add-bus-stp-cr"), {
        target: { value: "Camp Kigali" },
      });
      expect(getByTestId("add-bus-stp-cr").value).toMatch("Camp Kigali");

      expect(getByTestId("create-route-btn")).toBeValid();
      fireEvent.click(getByTestId("create-route-btn"));
    });
  });

  // update route modal
  describe("Tests for update route modal", () => {
    it(">>>> Can select a route and the edit button renders correctly", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("routes"));

      expect(getByTestId("route-row")).toBeValid();
      fireEvent.click(getByTestId("route-row"));

      expect(getByTestId("open-update-modal")).toBeValid();
    });

    it(">>>> Can select a route, click on the edit button, and the update modal renders correctly", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("routes"));

      fireEvent.click(getByTestId("route-row"));

      fireEvent.click(getByTestId("open-update-modal"));

      expect(getByTestId("update-route-btn")).toBeValid();
    });

    it(">>>> Can select a route, click on the edit button, and cancel the update modal correctly", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("routes"));

      fireEvent.click(getByTestId("route-row"));

      fireEvent.click(getByTestId("open-update-modal"));

      expect(getByTestId("cancel-update-modal-btn")).toBeValid();
      fireEvent.click(getByTestId("cancel-update-modal-btn"));
    });

    it(">>>> Cannot update a route to have the same start location and destination", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("routes"));

      fireEvent.click(getByTestId("route-row"));

      fireEvent.click(getByTestId("open-update-modal"));

      fireEvent.change(getByTestId("start-loc-update"), {
        target: { value: 6 },
      });
      expect(getByTestId("start-loc-update").value).toMatch("6");

      fireEvent.change(getByTestId("dest-loc-update"), {
        target: { value: 6 },
      });
      expect(getByTestId("dest-loc-update").value).toMatch("6");

      fireEvent.click(getByTestId("update-route-btn"));

      expect(getByTestId("update-route-btn")).toBeValid();
    });

    it(">>>> Can update a route correctly", () => {
      const { getByTestId, getByRole } = render(<AdminPage />);
      fireEvent.click(getByTestId("routes"));

      fireEvent.click(getByTestId("route-row"));

      fireEvent.click(getByTestId("open-update-modal"));

      fireEvent.change(getByTestId("route-name-update"), {
        target: { value: "Test1 - Test2" },
      });
      expect(getByTestId("route-name-update").value).toMatch("Test1 - Test2");

      fireEvent.change(getByTestId("route-code-update"), {
        target: { value: "T1 - T2" },
      });
      expect(getByTestId("route-code-update").value).toMatch("T1 - T2");

      fireEvent.change(getByTestId("route-length-update"), {
        target: { value: "10km" },
      });
      expect(getByTestId("route-length-update").value).toMatch("10km");

      fireEvent.change(getByTestId("assigned-buses-update"), {
        target: { value: 10 },
      });
      expect(getByTestId("assigned-buses-update").value).toMatch("10");

      fireEvent.change(getByTestId("start-loc-update"), {
        target: { value: 1.12 },
      });
      expect(getByTestId("start-loc-update").value).toMatch("1.12");

      fireEvent.change(getByTestId("dest-loc-update"), {
        target: { value: 30.1 },
      });
      expect(getByTestId("dest-loc-update").value).toMatch("30.1");

      fireEvent.mouseDown(getByRole("button", { name: /delete a bus stop/i }));

      fireEvent.click(within(getByRole("listbox")).getByText(/Kimironko/i));

      // check if you can add the same bus stop again
      fireEvent.change(getByTestId("add-bus-stp"), {
        target: { value: "Camp Kigali" },
      });
      expect(getByTestId("add-bus-stp").value).toMatch("");

      fireEvent.change(getByTestId("add-bus-stp"), {
        target: { value: "Cosmos" },
      });
      expect(getByTestId("add-bus-stp").value).toMatch("Cosmos");

      fireEvent.click(getByTestId("update-route-btn"));
    });
  });

  // delete route
  describe("Tests for deleting a route", () => {
    it(">>>> Can delete one route correctly", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("routes"));

      fireEvent.click(getByTestId("route-row"));

      expect(getByTestId("delete-btn")).toBeValid();
      fireEvent.click(getByTestId("delete-btn"));
    });

    it(">>>> Can delete two (multiple) routes correctly", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("routes"));

      fireEvent.click(getByTestId("route-row"));
      fireEvent.click(getByTestId("route-row2"));

      expect(getByTestId("delete-btn")).toBeValid();
      fireEvent.click(getByTestId("delete-btn"));
    });
  });
});
describe("Tests for Users section", () => {
  describe("Tests for table sorting and selecting", () => {
    it(">>>> can select all rows and unselect them", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("users"));

      expect(getByTestId("select-all-rows")).toBeValid();
      fireEvent.click(getByTestId("select-all-rows"));

      expect(getByTestId("select-all-rows")).toBeValid();
      fireEvent.click(getByTestId("select-all-rows"));
    });

   
    it(">>>> can sort rows by characters", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("users"));
      expect(getByTestId("sort-by-char")).toBeValid();
      fireEvent.click(getByTestId("sort-by-char"));
    });
  });
  describe("Tests for table pagination", () => {
    it(">>>> can move to the next and last page", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("users"));

      expect(getByTestId("next-page-btn")).toBeValid();
      expect(getByTestId("last-page-btn")).toBeValid();

      fireEvent.click(getByTestId("next-page-btn"));
      fireEvent.click(getByTestId("last-page-btn"));
    });

    it(">>>> can move to the previous and first page", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("users"));

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
  // create user modal
  describe("Tests for create useer modal", () => {
    it(">>>> Can open create user modal correctly", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("users"));
      expect(getByTestId("open-create-modal")).toBeValid();
      fireEvent.click(getByTestId("open-create-modal"));
    });
    it(">>>> Can open the create User modal correctly and NOT submit the form with empty fields", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("users"));
      expect(getByTestId("open-create-modal")).toBeValid();
      fireEvent.click(getByTestId("open-create-modal"));

      expect(getByTestId("create-user-btn")).toBeValid();
      fireEvent.click(getByTestId("create-user-btn"));

      expect(getByTestId("cancel-create-user-btn")).toBeValid();
    });
    it(">>>> Can create a user from the modal", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("users"));

      expect(getByTestId("open-create-modal")).toBeValid();
      fireEvent.click(getByTestId("open-create-modal"));

      fireEvent.change(getByTestId("Name-create"), {
        target: { value: "Ange" },
      });
      expect(getByTestId("Name-create").value).toMatch("Ange");

      fireEvent.change(getByTestId("Email-create"), {
        target: { value: "inange2013@gmail.com" },
      });
      expect(getByTestId("Email-create").value).toMatch("inange2013@gmail.com");

      fireEvent.change(getByTestId("user-status-create"), {
        target: { value: "Active" },
      });
      expect(getByTestId("user-status-create").value).toMatch("Active");

      fireEvent.click(getByTestId("create-user-btn"));
    });
    it(">>>> Can open and cancel create user modal correctly", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("users"));
      expect(getByTestId("open-create-modal")).toBeValid();
      fireEvent.click(getByTestId("open-create-modal"));

      expect(getByTestId("cancel-create-user-btn")).toBeValid();
      fireEvent.click(getByTestId("cancel-create-user-btn"));
    });
  });
  // update user modal
  describe("Tests for update user modal", () => {
    it(">>>> Can select a bus and the edit button renders correctly", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("users"));

      expect(getByTestId("user-row")).toBeValid();
      fireEvent.click(getByTestId("user-row"));

      expect(getByTestId("open-update-modal")).toBeValid();
    });

    it(">>>> Can select a user, click on the edit button, and the update modal renders correctly", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("users"));

      fireEvent.click(getByTestId("user-row"));

      fireEvent.click(getByTestId("open-update-modal"));

      expect(getByTestId("update-user-btn")).toBeValid();
    });

    it(">>>> Can select a user, click on the edit button, and cancel the update modal correctly", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("users"));

      fireEvent.click(getByTestId("user-row"));

      fireEvent.click(getByTestId("open-update-modal"));

      expect(getByTestId("cancel-update-modal-btn")).toBeValid();
      fireEvent.click(getByTestId("cancel-update-modal-btn"));
    });

    it(">>>> Can update a user correctly", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("users"));

      fireEvent.click(getByTestId("user-row"));

      fireEvent.click(getByTestId("open-update-modal"));

      fireEvent.change(getByTestId("Name-update"), {
        target: { value: "Ange" },
      });
      expect(getByTestId("Name-update").value).toMatch("Ange");

      fireEvent.change(getByTestId("user-email-update"), {
        target: { value: "inange2013@gmail.com" },
      });
      expect(getByTestId("user-email-update").value).toMatch(
        "inange2013@gmail.com"
      );

      fireEvent.change(getByTestId("user-status-update"), {
        target: { value: "Active" },
      });
      expect(getByTestId("user-status-update").value).toMatch("Active");

      fireEvent.click(getByTestId("update-user-btn"));
    });
  });
  // delete user
  describe("Tests for deleting a user", () => {
    it(">>>> Can delete one user correctly", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("users"));

      fireEvent.click(getByTestId("user-row"));

      expect(getByTestId("delete-btn")).toBeValid();
      fireEvent.click(getByTestId("delete-btn"));
    });

    it(">>>> Can delete two (multiple) users correctly", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("users"));

      fireEvent.click(getByTestId("user-row"));
      fireEvent.click(getByTestId("user-row2"));

      expect(getByTestId("delete-btn")).toBeValid();
      fireEvent.click(getByTestId("delete-btn"));
    });
  });
});
describe("Tests for buses section", () => {
  describe("Tests for table sorting and selecting", () => {
    it(">>>> can select all rows and unselect them", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("bus"));

      expect(getByTestId("select-all-rows")).toBeValid();
      fireEvent.click(getByTestId("select-all-rows"));

      expect(getByTestId("select-all-rows")).toBeValid();
      fireEvent.click(getByTestId("select-all-rows"));
    });
    it(">>>> can sort rows by characters", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("bus"));
      expect(getByTestId("sort-by-char")).toBeValid();
      fireEvent.click(getByTestId("sort-by-char"));
    });
    it(">>>> can sort rows by numbers", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("bus"));
      expect(getByTestId("sort-by-numbers")).toBeValid();
      fireEvent.click(getByTestId("sort-by-numbers"));
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

  // create Bus modal
  describe("Tests for create bus modal", () => {
    it(">>>> Can open create bus modal correctly", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("bus"));
      expect(getByTestId("open-create-modal")).toBeValid();
      fireEvent.click(getByTestId("open-create-modal"));
    });
    it(">>>> Can open the create bus modal correctly and NOT submit the form with empty fields", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("bus"));
      expect(getByTestId("open-create-modal")).toBeValid();
      fireEvent.click(getByTestId("open-create-modal"));

      expect(getByTestId("create-bus-btn")).toBeValid();
      fireEvent.click(getByTestId("create-bus-btn"));

      expect(getByTestId("cancel-create-bus-btn")).toBeValid();
    });
    it(">>>> Can create a bus from the modal", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("bus"));

      expect(getByTestId("open-create-modal")).toBeValid();
      fireEvent.click(getByTestId("open-create-modal"));

      fireEvent.change(getByTestId("bus-plate-create"), {
        target: { value: "RAD 345 C" },
      });
      expect(getByTestId("bus-plate-create").value).toMatch("RAD 345 C");

      fireEvent.change(getByTestId("bus-routeId-create"), {
        target: { value: 1 },
      });
      expect(getByTestId("bus-routeId-create").value).toMatch(1);

      fireEvent.change(getByTestId("bus-status-create"), {
        target: { value: "inactive" },
      });
      expect(getByTestId("bus-status-create").value).toMatch("inactive");

      fireEvent.change(getByTestId("bus-currentLocation-create"), {
        target: { value: "39.807222, -70.984722" },
      });
      expect(getByTestId("bus-currentLocation-create").value).toMatch(
        "39.807222, -70.984722"
      );

      fireEvent.click(getByTestId("create-bus-btn"));
    });
    it(">>>> Can open and cancel create bus modal correctly", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("bus"));
      expect(getByTestId("open-create-modal")).toBeValid();
      fireEvent.click(getByTestId("open-create-modal"));

      expect(getByTestId("cancel-create-bus-btn")).toBeValid();
      fireEvent.click(getByTestId("cancel-create-bus-btn"));
    });
  });
  // update bus modal
  describe("Tests for update bus modal", () => {
    it(">>>> Can select a bus and the edit button renders correctly", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("bus"));

      expect(getByTestId("bus-row")).toBeValid();
      fireEvent.click(getByTestId("bus-row"));

      expect(getByTestId("open-update-modal")).toBeValid();
    });

    it(">>>> Can select a bus, click on the edit button, and the update modal renders correctly", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("bus"));

      fireEvent.click(getByTestId("bus-row"));

      fireEvent.click(getByTestId("open-update-modal"));

      expect(getByTestId("update-bus-btn")).toBeValid();
    });

    it(">>>> Can select a bus, click on the edit button, and cancel the update modal correctly", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("bus"));

      fireEvent.click(getByTestId("bus-row"));

      fireEvent.click(getByTestId("open-update-modal"));

      expect(getByTestId("cancel-update-modal-btn")).toBeValid();
      fireEvent.click(getByTestId("cancel-update-modal-btn"));
    });

    it(">>>> Can update a bus correctly", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("bus"));

      fireEvent.click(getByTestId("bus-row"));

      fireEvent.click(getByTestId("open-update-modal"));

      fireEvent.change(getByTestId("bus-plate-update"), {
        target: { value: "RAD 345 C" },
      });
      expect(getByTestId("bus-plate-update").value).toMatch("RAD 345 C");

      fireEvent.change(getByTestId("bus-routeId-update"), {
        target: { value: 1 },
      });
      expect(getByTestId("bus-routeId-update").value).toMatch(1);

      fireEvent.change(getByTestId("bus-status-update"), {
        target: { value: "inactive" },
      });
      expect(getByTestId("bus-status-update").value).toMatch("inactive");

      fireEvent.change(getByTestId("bus-currentLocation-update"), {
        target: { value: "39.807222, -70.984722" },
      });
      expect(getByTestId("bus-currentLocation-update").value).toMatch(
        "39.807222, -70.984722"
      );

      fireEvent.click(getByTestId("update-bus-btn"));
    });
  });
  // delete bus
  describe("Tests for deleting a bus", () => {
    it(">>>> Can delete one bus correctly", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("bus"));

      fireEvent.click(getByTestId("bus-row"));

      expect(getByTestId("delete-btn")).toBeValid();
      fireEvent.click(getByTestId("delete-btn"));
    });

    it(">>>> Can delete two (multiple) buses correctly", () => {
      const { getByTestId } = render(<AdminPage />);
      fireEvent.click(getByTestId("bus"));

      fireEvent.click(getByTestId("bus-row"));
      fireEvent.click(getByTestId("bus-row2"));

      expect(getByTestId("delete-btn")).toBeValid();
      fireEvent.click(getByTestId("delete-btn"));
    });
  });
});
