import React, { useContext } from 'react';
import { DashboardContext } from 'context/DashboardContext';
import Bus from './Bus/Bus';
import BusStops from './BusStops/BusStops';
import Routes from './Routes/Routes';
import Settings from './Settings/Settings';
import Users from './Users/Users';
import Dashboard from './Dashboard/Dashboard';


const ContentsWrapper = () => {
  const { dashboardState } = useContext(DashboardContext);

  return (
    dashboardState.currentPage === "dashboard" ?
      <Dashboard />
      : dashboardState.currentPage === "routes" ?
        <Routes />
        : dashboardState.currentPage === "bus" ?
          <Bus />
          : dashboardState.currentPage === "busStops" ?
            <BusStops />
            : dashboardState.currentPage === "users" ?
              <Users />
              : dashboardState.currentPage === "settings" ?
                <Settings />
                : <h1>Page not found</h1>		

  );
}

export default ContentsWrapper;