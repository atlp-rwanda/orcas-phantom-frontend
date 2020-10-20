import Styled from "@emotion/styled";

// main wrapper
export const Wrapper = Styled.div`
  background: #f8f9fe;
  min-height: 100vh;
  display: flex;
  align-items: stretch;
  justify-content: space-between;

  @media(max-width: 768px) {
    justify-content: center;
  }
`;

export const RightSide = Styled.div`
  flex-basis: 100%;
  margin-left: 20%;
  justify-self: flex-end;
  display: flex;
  flex-direction: column;

  @media(max-width: 768px) {
    margin: 0;
    justify-self: center;
  }
`;

// side menu

export const SideMenuWrapper = Styled.div`
  background: #fff;
  width: 20%;
  min-height: 100%;
  left: 0;
  top: 0;
  position: fixed;
  box-shadow: 0 0 2rem 0 rgba(136, 152, 170, .15);
  @media(min-width: 769px) {
    display: block !important;
  }
  @media(max-width: 768px) {
    display: none;
    z-index: 100000;
    width: 60%;
  }
`;

export const Toggler = Styled.div`
  display: none;

  @media(max-width: 768px) {
    display: block;
  }
`;

export const Logo = Styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5em 1em 2em 1em;

  h3 {
    font-size: 1.3em;
    text-transform: uppercase;
    font-weight: bold;
  }

  div:nth-of-type(2) {
    line-height: 100%;
    padding-top: 1em;
    letter-spacing: 1px;
    opacity: 0.95;
  }

  @media(max-width: 768px) {
    padding: 1.5em 0em 2em 0em;
    max-width: 100%;
    justify-content: center;

    div:first-of-type {
      transform: scale(0.6);
    }

    div:nth-of-type(2) {
      opacity: 0.8;
      padding: 0 0 0 0;
      margin-left: 1em;

      h3 {
        font-size: 1em;
        padding: 0 0 0 0;
        margin: 0;
      }
    }

    div:last-child {
      opacity: 0.8;
      margin-left: auto;
      padding: 0;
      img {
        transform: scale(0.6);
        padding-right: 1em;
      }
    }
  }
`;

export const SidemenuItem = Styled.li`
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  text-align: left;
  margin: 0em auto;
  height: 5em;
  cursor: pointer;
`;

export const SidemenuItemText = Styled.div`
  flex-basis: 97.5%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  div:first-of-type {
    margin-left: 1.5em;
  }

  div:last-child {
    margin-left: 3em;
  } 

  @media (max-width: 768px) {
    div:last-child {
      margin-left: 3em;
    }
  }
`;

export const SidemenuIndicator = Styled.div`
  flex-basis: 2.5%;
  width: 100%;
`;

// top nav bar

export const TopNavWrapper = Styled.div`
  background: #5E72E4;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 2em;
  border-bottom: 1px solid darkgray;

  @media(max-width: 768px) {
    padding: 1em;
    border-bottom: none;
  }
`;

export const NavWrapper = Styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  column-gap: 2em;
  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
  }
`;

export const Search = Styled.div`
  margin-right: 1.5em;
  
  .ant-input-affix-wrapper {
    border-radius: 1em;
  }

  @media(max-width: 768px) {
    display: none;
  }
`;

export const Breadcrumb = Styled.div`
  font-size: small;
  font-weight: thin;
  background: #E9ECEF;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.3em 1em;
  column-gap: 0.5em;
  box-shadow: 2px 2px 4px solid darkgray;
  border-radius: 1em;

  div:nth-of-type(3) {
    color: #5E72E4;
    cursor: pointer;
  }
  
  div:last-child {
    color: #5E72E4;
  }

  @media(max-width: 768px) {
    display: none;
  }
`;

export const Notification = Styled.div`
  cursor: pointer;

  img {
    transform: scale(0.8);
  }
`;

export const Tabs = Styled.div`
  cursor: pointer;

  img {
    transform: scale(0.8);
  }
`;

export const Admin = Styled.div`
  cursor: pointer;

  img {
    transform: scale(0.8);
  }

  @media(max-width: 768px) {
    margin-left: auto;
  }
`;

export const MenuToggler = Styled.div`
  display: none;

  @media(max-width: 768px) {
    display: block;

    img {
      transform: scale(0.7);
    }
  }
`;

export const SideMenuFooter = Styled.div`
  display: none;

  @media(max-width: 768px) {
    z-index: 1000000;
    display: block;
    text-align: center;
    width: 100%;
    position: absolute;
    bottom: 1em;
    left: 0px;
  }
`;
