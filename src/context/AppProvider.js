/* eslint-disable react/prop-types */
import React, { useState, createContext } from 'react';

const store = {
  lat: -1.9470658,
  lng: 30.0915372,
  origin: "",
  destination: "",
  isSubmitted: false,
  isNavToggled: false
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
