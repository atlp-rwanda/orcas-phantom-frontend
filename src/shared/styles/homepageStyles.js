import Styled from "@emotion/styled";

// Bus Info
export const NearbyBus = Styled.div`
  text-align: left;
  font-size: smaller;
  opacity: 0.65;
`;

export const BusDetailIcon = Styled.div`
  margin-right: 2em;
`;

export const BusIcon = Styled.img`
  @media (max-width: 768px) {
    transform: scale(0.8);
  }
`;

export const BusInfoToast = Styled.div`
  z-index: 99999;
  position: absolute;
  bottom: 7em;
  left: 43%;
  margin: 0 auto;
  padding: 1.5em;
  width: fit-content;
  width: -moz-fit-content;
  background: white;
  box-shadow: 2px 2px 5px darkgray;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > div:first-of-type {
    margin-right: 2em;
  }

  @media(max-width: 768px) {
    bottom: 0.1em;
    left: 0.2em;
    width: 99%;
  }
`;

export const BusDetailWrapper = Styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin: 0 auto;
  row-gap: 1em;
`;

export const BusDetail = Styled.div`
  font-size: small;
  opacity: 0.7;
  letter-spacing: 1px;
  text-align: center;
`;

// Side Menu
export const MobileFooter = Styled.li`
  display: none;
  @media (max-width: 768px) {
    position: absolute;
    bottom: 1em;
    z-index: 99999;
    width: 100%;
    padding: 1em 0px 0px 0px;
    color: white;
    font-weight: bold;
    text-align: center;
    letter-spacing: 1px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 1em;
  }
`;

export const FooterIcons = Styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 2em;
`;

// search panel
export const OriginInput = Styled.div`
  margin-bottom: 0em;
  padding-bottom: 9em;
  @media(max-width: 768px) {
    padding-bottom: 3em;
    margin-bottom: 1em;
  }
`;

export const DestinationInput = Styled.div`
  margin-bottom: 0em;
  @media(max-width: 768px) {
    margin-bottom: 0em;
  }
`;

export const SeparatorLine = Styled.hr`
  display: none;
  @media (max-width: 768px) {
    display: block;
    width: 100%;
  }
`;

export const HideOnMobile = Styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

export const RouteName = Styled.div`
  color: blue;
  font-size: small;
  opacity: 0.7;
  letter-spacing: 1px;
  text-align: center;
  padding-left: 1em;
  padding-top: 0.15em;
`;

export const RouteWrapper = Styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding-top: em;
  margin: 0 auto;
  @media(max-width: 768px) {
    z-index: 10000001;
    position: absolute;
    top: 15em;
    text-align: center;
    width: fit-content;
    width: -moz-fit-content;
  }
`;

export const BusDetails = Styled.div`
  padding: 0px 1em 5em 1em;

  @media(max-width: 768px) {
    background: white;
    z-index: 999999;
    position: absolute;
    bottom: 0px;
    left: 0;
    width: 100%;
    height: auto;
    padding: 0px;
  }
`;

// search box
export const SearchWrapper = Styled.div`
  border-radius: 5px;
  box-shadow: 2px 2px 3px darkgrey;
  background: white;
	z-index: 99999;
	position: absolute;
	top: 1em;
	left: 45%;
	display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 2em;
  @media (max-width: 768px) {
    border-radius: none;
    box-shadow: none;
    border: none;
    top: 5em;
    justify-content: center;
    padding: 0px 0.2em;
  }
`;

export const SearchInput = Styled.div`
	flex: 1;
`;
