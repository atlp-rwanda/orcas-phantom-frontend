import React from "react";
import DashboardContextWrapper from "context/DashboardContext";
import SideMenu from "./SideMenu.js";
import TopNavBar from "./TopNavBar.js";
import ContentsWrapper from "Dashboard/components/";
import { Wrapper, RightSide } from "shared/styles/dashboard/";

const MainWrapper = () => {
  return (
    <DashboardContextWrapper>
      <Wrapper>
        <SideMenu />

        <RightSide>
          <TopNavBar />
          <ContentsWrapper />
        </RightSide>
      </Wrapper>
    </DashboardContextWrapper>
  );
};

export default MainWrapper;
