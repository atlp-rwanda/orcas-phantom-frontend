import React, { useContext, useEffect } from 'react';
import './css/style.css';
import MapComponent from './MapComponent';
import { AppContext } from 'context/AppProvider';
import SearchBox from './SearchBox';
import SearchPanel from './SearchPanel';
import SideMenu from './SideMenu';
import BusInfo from './BusInfo';
import Footer from './Footer';
import menuIcon from 'App/assets/images/menu-icon-dashboard.svg';
import originBS from 'shared/constants/originBusStops.js';
import destinationBS from 'shared/constants/destBusStops.js';


const LandingPage = () => {

  const { state, setState } = useContext(AppContext);
    
  const handleChange = ({ name, value }) => {
    if (name === "origin") {
      setState({
        ...state,
        origin: value,
        charCountOrigin: value ? value.length : 0
      });
    }

    if (name === "destination") {
      setState({
        ...state,
        destination: value,
        charCountDest: value ? value.length : 0
      });
    }
  }

  useEffect(() => {
    if (state.origin && state.destination) {
      let validInputs = false;

      originBS.forEach(busStop => {
        if (busStop.label === state.origin) {
          destinationBS.forEach(busStop => {
            if (busStop.label === state.destination) {
              validInputs = true;
            }
          });
        }
      });

      if (validInputs) {
        handleSubmit();
      }
    } else {
      setState({
        ...state,
        isSubmitted: false
      });
    }
  }, [state.origin, state.destination]);

  const handleSubmit = () => {
    setState({
      ...state,
      isSubmitted: true
    });
  }

  return (
    <main data-testid="homepage" className="main-wrapper">
      <div className="LandingMenuWrapper">
        <SearchBox />
      
      
        <SearchPanel
          data={state}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setState={setState} />
        <SideMenu data={{...state}} setState={setState} />
      </div>
          
      <div
        data-testid="search-icon"
        onClick={() => setState({
          ...state,
          isSearchToggled: !state.isSearchToggled
        })}
        className="search-icon">
        <img src={menuIcon} />
      </div>
       
      <div
        data-testid="menu-icon"
        onClick={() => setState({
          ...state,
          isNavToggled: !state.isNavToggled
        })}
        className="menu-icon">
        <img src={menuIcon} />
      </div>
     
      <div id="bus-map">
        { 
          state.isSubmitted ?
            <MapComponent origin={state.coords.origin} destination={state.coords.destination} />
            :
            <MapComponent />
        }
      </div>

      {
        state.isSubmitted ?
          <BusInfo data={state} />
          :
          null
      }

      <Footer />
    </main>
  );
}


export default LandingPage;
