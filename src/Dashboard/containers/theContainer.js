import React from 'react';
import DashboardContextWrapper from 'context/DashboardContext';
import TheSideMenu from './sideMenu';
import TheTopNav from './topNavBar';
import ContentsWrapper from 'Dashboard/components/';
import Styled from '@emotion/styled';

const CONT = Styled.div`
  background:#f8f9fe;
  min-height:100vh;
  display:flex
`;

const theContainer = () => {
  return (
    <DashboardContextWrapper>
      <CONT className="theContainer">
        <TheSideMenu />
        <TheTopNav />
        <ContentsWrapper />
      </CONT>
    </DashboardContextWrapper>
  );
}

export default theContainer;