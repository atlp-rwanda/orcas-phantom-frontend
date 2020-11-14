import React from "react";
import Routes from "./Routes";
import ContextWrapper from "../context/AppProvider";
import "antd/dist/antd.css";
import "leaflet/dist/leaflet.css";
import "./App.css";

const App = () => (
  <ContextWrapper>
    <Routes />
  </ContextWrapper>
);

export default App;
