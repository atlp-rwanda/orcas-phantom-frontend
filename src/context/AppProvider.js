/* eslint-disable react/prop-types */
import React, { useState, createContext } from 'react';

const store = {
  coords: {
    origin: {
      lat: -1.9470658,
      lng: 30.0915372
    },
    destination: {
      lat: -1.9378777,
      lng: 30.0609378
    }
  },
  sampleLocation: [],
  charCountOrigin: 0,
  charCountDest: 0,
  origin: "",
  destination: "",
  isSubmitted: false,
  isNavToggled: false,
  isSearchToggled: true,
  isAuthenticated:false,
  validated:true,
  currentUser:localStorage.getItem("user"),
  loading:false
}

export const AppContext = createContext(store);

const ContextWrapper = props => {

  const [state, setState] = useState(store);

  return (
    <AppContext.Provider value={{ state, setState }}>
      {props.children}
    </AppContext.Provider>
  )
}

export default ContextWrapper;
