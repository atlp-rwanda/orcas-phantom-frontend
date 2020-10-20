import React from 'react';
import Styled from '@emotion/styled';

const TOPNAVMENU = Styled.div`
  background:#5E72E4;
  min-height:120px;
  width:100vw;
  @media(max-width:768px){
    width:100vw
  }
`;

const Div = Styled.div`
  display:flex;
  left:287px;
  justify-content:space-between
`;

const Search = Styled.div`
  width:40vw;
  margin-left:311px;
  padding-top:25px;
  input {
    border-radius:30px;
    padding:9px 12px 9px 19px;
    background:#F0F0FD;
    border:none;
    outline:none
  };
  @media (max-width: 768px) {
    display:none;
  }
`;

const User=Styled.div`

`;

const topNavBar = () => {
  return (
    <div className="topNavBar">
      <TOPNAVMENU>
        <Div>
          <Search>
            <input type="text" placeholder="Search"></input>
          </Search>
          <User>

          </User>
        </Div>
      </TOPNAVMENU>
    </div>
  );
}

export default topNavBar;