/* eslint-disable react/prop-types */
import React, { useState, createContext } from "react";

const dashboardStore = {
  currentPage: "dashboard",
  isMenuToggled: true,
};

export const DashboardContext = createContext(dashboardStore);

const DashboardContextWrapper = (props) => {
  const [dashboardState, setDashboardState] = useState(dashboardStore);

  return (
    <DashboardContext.Provider value={{ dashboardState, setDashboardState }}>
      {props.children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextWrapper;
