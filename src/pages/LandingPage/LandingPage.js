import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./css/style.css";
import MapComponent from "./MapComponent";
import { AppContext } from "context/AppProvider";
import SearchBox from "./SearchBox";
import SearchPanel from "./SearchPanel";
import SideMenu from "./SideMenu";
import BusInfo from "./BusInfo";
import Footer from "./Footer";
import menuIcon from "App/assets/images/menu-icon-dashboard.svg";

const LandingPage = () => {
  const { state, setState } = useContext(AppContext);
  const [originBS, setOriginBS] = useState([]);
  const [destinationBS, setDestinationBS] = useState([]);

  // fetch bus stops
  useEffect(() => {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/" +
          "https://phantom-backend.herokuapp.com/busstop",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJndW5uZXJAZ21haWwuY29tIiwiaWF0IjoxNjA1NzI3MTIwfQ.L1ajl88wnXmfAgDF-wSCRP4PGBzQUNfrwO3aMghlte4",
          },
        }
      )
      .then((busStops) => {
        setDestinationBS(
          busStops.data.map((busStop) => ({
            ...busStop,
            value: busStop.busStopName,
          }))
        );
        setOriginBS(
          busStops.data.map((busStop) => ({
            ...busStop,
            value: busStop.busStopName,
          }))
        );
      })
      .catch((e) => console.log(e));
  }, []);

  const handleChange = ({ name, value }) => {
    if (name === "origin") {
      setState({
        ...state,
        origin: value,
        charCountOrigin: value ? value.length : 0,
      });
    }

    if (name === "destination") {
      setState({
        ...state,
        destination: value,
        charCountDest: value ? value.length : 0,
      });
    }
  };

  useEffect(() => {
    if (
      state.origin &&
      state.destination &&
      state.origin !== state.destination
    ) {
      let validInputs = false;

      originBS.forEach((busStop) => {
        if (busStop.busStopName === state.origin) {
          destinationBS.forEach((busStop) => {
            if (busStop.busStopName === state.destination) {
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
        isSubmitted: false,
      });
    }
  }, [state.origin, state.destination]);

  const handleSubmit = () => {
    setState({
      ...state,
      isSubmitted: true,
    });
  };

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
        {state.isSubmitted ? (
          <MapComponent
            origin={state.coords.origin}
            destination={state.coords.destination}
          />
        ) : (
          <MapComponent />
        )}
      </div>

      {state.isSubmitted ? <BusInfo data={state} /> : null}

      <Footer />
    </main>
  );
};

export default LandingPage;