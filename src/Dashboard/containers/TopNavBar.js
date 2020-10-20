import React, { useContext } from "react";
import { DashboardContext } from "context/DashboardContext";
import { Input } from "antd";
import searchIcon from "App/assets/images/search-dashboard-icon.svg";
import notificationIcon from "App/assets/images/bell-dashboard-icon.svg";
import menuIcon from "App/assets/images/menu-icon.svg";
import adminIcon from "App/assets/images/admin-dashboard-icon.svg";
import homeIcon from "App/assets/images/home-dashboard-icon.svg";
import tabsIcon from "App/assets/images/tabs-dashboard-icon.svg";
import {
  TopNavWrapper,
  NavWrapper,
  Search,
  Breadcrumb,
  Notification,
  Tabs,
  Admin,
  MenuToggler,
} from "shared/styles/dashboard/";

const TopNavBar = () => {
  const { dashboardState, setDashboardState } = useContext(DashboardContext);

  return (
    <div className="top-navbar">
      <TopNavWrapper>
        <Breadcrumb>
          <div>
            <img src={homeIcon} />
          </div>

          <div>/</div>

          <div
            data-testid="dashboard-breadcrumb"
            onClick={() =>
              setDashboardState({
                ...dashboardState,
                currentPage: "dashboard",
              })
            }
          >
            Dashboard
          </div>

          {dashboardState.currentPage !== "dashboard" && <div>/</div>}
          <div>
            {
              /* prettier-ignore */
              dashboardState.currentPage === "dashboard"
                ? ""
                : dashboardState.currentPage === "routes"
                  ? "Routes"
                  : dashboardState.currentPage === "bus"
                    ? "Bus"
                    : dashboardState.currentPage === "busStops"
                      ? "Bus Stops"
                      : dashboardState.currentPage === "users"
                        ? "Users"
                        : dashboardState.currentPage === "settings"
                          ? "Settings"
                          : ""
            }
          </div>
        </Breadcrumb>

        <NavWrapper>
          <MenuToggler
            onClick={() => {
              setDashboardState({
                ...dashboardState,
                isMenuToggled: !dashboardState.isMenuToggled,
              });
            }}
          >
            <img src={menuIcon} />
          </MenuToggler>
          <Search>
            <Input
              placeholder="Search"
              allowClear={true}
              bordered={true}
              prefix={<img src={searchIcon} />}
              size="middle"
            ></Input>
          </Search>

          <Notification>
            <img src={notificationIcon} />
          </Notification>

          <Tabs>
            <img src={tabsIcon} />
          </Tabs>

          <Admin>
            <img src={adminIcon} />
          </Admin>
        </NavWrapper>
      </TopNavWrapper>
    </div>
  );
};

export default TopNavBar;
