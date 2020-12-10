/* eslint-disable react/prop-types */
import React, { useState, createContext, useEffect } from "react";
import busStopsData from "../pages/LandingPage/busStopData.json";
import L, { Icon } from "leaflet";
import busStopIcon from "../App/assets/images/bus-stop6.svg";

const onEachFeature = (feature, layer) => {
  layer.setIcon(stopIcon);
  layer.bindPopup(`<p>Name: ${feature.properties.name}</p>`);
};

const stopIcon = new Icon({
  iconUrl: busStopIcon,
  iconSize: [60, 70],
});

const store = {
  coords: {
    origin: {
      lat: -1.9470658,
      lng: 30.0915372,
    },
    destination: {
      lat: -1.9378777,
      lng: 30.0609378,
    },
  },
  setMap: () => {},
  map: null,
  marker: null,
  sampleLocation: [],
  charCountOrigin: 0,
  charCountDest: 0,
  origin: "",
  destination: "",
  isSubmitted: false,
  isNavToggled: false,
  isSearchToggled: true,
  isAuthenticated: false,
  validated: true,
  currentUser: localStorage.getItem("user"),
  loading: false,
};

export const AppContext = createContext(store);

const ContextWrapper = (props) => {
  const [state, setState] = useState(store);
  const [mapState, setMapState] = useState();
  const [busStops, setBusStops] = useState();

  const handleSetMappState = (_mapState) => {
    setMapState(_mapState);
    console.log(_mapState, "Works!!!");
  };

  useEffect(() => {
    setBusStops(
      L.geoJSON(busStopsData, {
        onEachFeature: onEachFeature,
      })
    );
  }, []);

  return (
    <AppContext.Provider
      value={{
        busStopMarker: busStops,
        state,
        map: mapState,
        setMapState: handleSetMappState,
        setState,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default ContextWrapper;