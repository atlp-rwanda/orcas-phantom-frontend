import React, { useContext } from 'react';
import { DashboardContext } from 'context/DashboardContext';
import Styled from '@emotion/styled';


const SIDEMENU = Styled.div`
  background:#fff;
  width:287px;
  min-height:100vh;
  left:0;
  position:fixed;
  box-shadow: 0 0 2rem 0 rgba(136, 152, 170, .15);
  @media (max-width:768px) {
    left:-288px;
  };
`;

const LOGO = Styled.h3`
  font-size:25px;
  padding: 15px 0 0 35px;
  text-transform:uppercase;
  font-weight:bold;
`;

const LABEL = Styled.label`
  width:50px;
  height:40px;
  position:fixed;
  display:flex;
  justify-content:center;
  align-item:center;
  flex-direction:column;
  left:20px;
  top:16px;
  &:hover{
    cursor:pointer;
  };
`;

const SPAN = Styled.span`
  width:50%;
  transform-origin:center center;
  height:3px;
  margin-top:6px;
  background-color:#fff;
  position:relative;
  display:block;
`;

const sidemenu = () => {
  const { dashboardState, setDashboardState } = useContext(DashboardContext);

  const switchComponent = name => {
    setDashboardState({
      currentPage: name
    });
  }


  return (
    <React.Fragment>
      <LABEL>
        <SPAN></SPAN>
        <SPAN></SPAN>
        <SPAN></SPAN>
      </LABEL>
      <SIDEMENU >
        <div className="">
          <div className="log-section">
            <LOGO>Phantom</LOGO>
          </div> 
          <div>
            <ul>
              <li style={{background: dashboardState.currentPage === "dashboard" && "gray" }} onClick={() => switchComponent("dashboard")}>Dashboard</li>
              <li style={{background: dashboardState.currentPage === "routes" && "gray" }} onClick={() => switchComponent("routes")}>Routes</li>
              <li style={{background: dashboardState.currentPage === "bus" && "gray" }} onClick={() => switchComponent("bus")}>Bus</li>
              <li style={{background: dashboardState.currentPage === "busStops" && "gray" }} onClick={() => switchComponent("busStops")}>Bus Stops</li>
              <li style={{background: dashboardState.currentPage === "users" && "gray" }} onClick={() => switchComponent("users")}>Users</li>
              <li style={{background: dashboardState.currentPage === "settings" && "gray" }} onClick={() => switchComponent("settings")}>Settings</li>
            </ul>
          </div>
        </div>
      </SIDEMENU>
    </React.Fragment>
  );
}

export default sidemenu;