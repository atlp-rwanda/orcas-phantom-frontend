import React, { useContext } from "react";
// import menuIcon from 'App/assets/images/menu-icon-dashboard.svg';
import phantomLogo from "App/assets/images/phantom-dashboard-logo.svg";
import dashboardIcon from "App/assets/images/dashboard-icon.svg";
import routesIcon from "App/assets/images/routes-icon.svg";
import busIcon from "App/assets/images/bus-dashboard-icon.svg";
import busStopsIcon from "App/assets/images/busStops-icon.svg";
import usersIcon from "App/assets/images/users-icon.svg";
import settingsIcon from "App/assets/images/settings-icon.svg";
import backButton from "App/assets/images/back-button-homepage.svg";
import { DashboardContext } from "context/DashboardContext";
import {
  SideMenuWrapper,
  Logo,
  SidemenuItem,
  SidemenuItemText,
  SidemenuIndicator,
  Toggler,
  SideMenuFooter,
} from "shared/styles/dashboard/";
import { Link, Router } from "react-router-dom";
import history from "browserHistory";

const SideMenu = () => {
  const { dashboardState, setDashboardState } = useContext(DashboardContext);

  const switchComponent = (name) => {
    setDashboardState({
      ...dashboardState,
      currentPage: name,
    });
  };

  return (
    <SideMenuWrapper
      style={{ display: dashboardState.isMenuToggled ? "block" : "none" }}
    >
      <div>
        <div className="log-section">
          <Router history={history}>
            <Logo>
              <div>
                <Link to="/">
                  <img src={phantomLogo} />
                </Link>
              </div>
              <div>
                <h3>
                  <Link style={{ color: "black" }} to="/">
                    Phantom
                  </Link>
                </h3>
              </div>
              <Toggler
                data-testid="sidemenu-toggler"
                onClick={() => {
                  setDashboardState({
                    ...dashboardState,
                    isMenuToggled: !dashboardState.isMenuToggled,
                  });
                }}
              >
                <img src={backButton} />
              </Toggler>
            </Logo>
          </Router>
        </div>
        <div>
          <ul>
            <SidemenuItem
              data-testid="dashboard"
              style={{
                color:
                  dashboardState.currentPage === "dashboard" &&
                  "rgb(136, 211, 98)",
              }}
              onClick={() => switchComponent("dashboard")}
            >
              <SidemenuIndicator
                style={{
                  background:
                    dashboardState.currentPage === "dashboard"
                      ? "rgb(136, 211, 98)"
                      : "#5E72E4",
                }}
              ></SidemenuIndicator>
              <SidemenuItemText>
                <div>
                  <img src={dashboardIcon} />
                </div>
                <div>Dashboard</div>
              </SidemenuItemText>
            </SidemenuItem>
            <SidemenuItem
              data-testid="routes"
              style={{
                color:
                  dashboardState.currentPage === "routes" &&
                  "rgb(136, 211, 98)",
              }}
              onClick={() => switchComponent("routes")}
            >
              <SidemenuIndicator
                style={{
                  background:
                    dashboardState.currentPage === "routes"
                      ? "rgb(136, 211, 98)"
                      : "#5E72E4",
                }}
              ></SidemenuIndicator>
              <SidemenuItemText>
                <div>
                  <img src={routesIcon} />
                </div>
                <div>Routes</div>
              </SidemenuItemText>
            </SidemenuItem>
            <SidemenuItem
              data-testid="bus"
              style={{
                color:
                  dashboardState.currentPage === "bus" && "rgb(136, 211, 98)",
              }}
              onClick={() => switchComponent("bus")}
            >
              <SidemenuIndicator
                style={{
                  background:
                    dashboardState.currentPage === "bus"
                      ? "rgb(136, 211, 98)"
                      : "#5E72E4",
                }}
              ></SidemenuIndicator>
              <SidemenuItemText>
                <div>
                  <img src={busIcon} />
                </div>
                <div>Bus</div>
              </SidemenuItemText>
            </SidemenuItem>
            <SidemenuItem
              data-testid="bus-stops"
              style={{
                color:
                  dashboardState.currentPage === "busStops" &&
                  "rgb(136, 211, 98)",
              }}
              onClick={() => switchComponent("busStops")}
            >
              <SidemenuIndicator
                style={{
                  background:
                    dashboardState.currentPage === "busStops"
                      ? "rgb(136, 211, 98)"
                      : "#5E72E4",
                }}
              ></SidemenuIndicator>
              <SidemenuItemText>
                <div>
                  <img src={busStopsIcon} />
                </div>
                <div>Bus Stops</div>
              </SidemenuItemText>
            </SidemenuItem>
            <SidemenuItem
              data-testid="users-link"
              testID="users-link"
              style={{
                color:
                  dashboardState.currentPage === "users" && "rgb(136, 211, 98)",
              }}
              onClick={() => switchComponent("users")}
            >
              <SidemenuIndicator
                style={{
                  background:
                    dashboardState.currentPage === "users"
                      ? "rgb(136, 211, 98)"
                      : "#5E72E4",
                }}
              ></SidemenuIndicator>
              <SidemenuItemText>
                <div>
                  <img src={usersIcon} />
                </div>
                <div>Users</div>
              </SidemenuItemText>
            </SidemenuItem>
            <SidemenuItem
              data-testid="settings"
              style={{
                color:
                  dashboardState.currentPage === "settings" &&
                  "rgb(136, 211, 98)",
              }}
              onClick={() => switchComponent("settings")}
            >
              <SidemenuIndicator
                style={{
                  background:
                    dashboardState.currentPage === "settings"
                      ? "rgb(136, 211, 98)"
                      : "#5E72E4",
                }}
              ></SidemenuIndicator>
              <SidemenuItemText>
                <div>
                  <img src={settingsIcon} />
                </div>
                <div>Settings</div>
              </SidemenuItemText>
            </SidemenuItem>
          </ul>
        </div>
      </div>
      {dashboardState.isMenuToggled && (
        <SideMenuFooter>Phantom Dashboard</SideMenuFooter>
      )}
    </SideMenuWrapper>
  );
};

export default SideMenu;
