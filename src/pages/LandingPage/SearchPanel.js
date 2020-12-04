import React, { useState, useEffect,useContext } from "react";
import directionIcon from "App/assets/images/direction-icon.svg";
import backButton from "App/assets/images/back-button-homepage.svg";
import PropTypes from "prop-types";
import originData from "shared/constants/originBusStops.js";
import destinationData from "shared/constants/destBusStops.js";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import LogoDark from "App/assets/images/phantom-logo-blue.svg";
import LogoWhite from "App/assets/images/phantom-logo-white.svg";
import {
  OriginInput,
  DestinationInput,
  SeparatorLine,
  HideOnMobile,
  RouteName,
  RouteWrapper,
  BusDetails,
} from "shared/styles/homepageStyles";
import Switch from "react-switch";
import { AppContext } from 'context/AppProvider';

const SearchPanel = (props) => {
  const { state } = useContext(AppContext);
  const toggle = () => {
    props.setState({
      ...props.data,
      isSearchToggled: !props.data.isSearchToggled,
    });
  };
  const handleSwitch=()=> {
    props.setState({
      ...props.data,
      isSwitched: !props.data.isSwitched,
    });
    
  };

  const [orig, setOrig] = useState("");
  const [dst, setDst] = useState("");

  const [origin, setOrigin] = useState("");
  const [destination, setDest] = useState("");

  const handleChange = (Event) => {
    const { name, value } = Event.target;
    if (name === "origin") {
      setOrigin(value);
      setOrig(value);

      const eventObj = {
        name,
        value,
      };

      props.handleChange(eventObj);
    }

    if (name === "destination") {
      setDest(value);
      setDst(value);

      const eventObj = {
        name,
        value,
      };

      props.handleChange(eventObj);
    }
  };

  const handleChangeAuto = (name, value) => {
    if (name === "origin") {
      const eventObj = { name, value };

      props.handleChange(eventObj);
    }

    if (name === "destination") {
      const eventObj = { name, value };

      props.handleChange(eventObj);
    }
  };
  
  const getWidth = () => window.innerWidth;

  const [width, setWidth] = useState(getWidth());

  const handleResize = () => setWidth(() => getWidth());

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  

  return (
    <div className={`sidebar ${props.data.isSearchToggled ? "" : "sidebarHide"}`}>
      <div className="search-box">
        <div className="sidebar-top">
          {props.data.isSearchToggled ? (
            <div
              data-testid="back-btn-search"
              onClick={toggle}
              id="back-btn-search"
            >
              <img src={backButton} />
            </div>
          ) : null}
          <div className="logo-txt">
            {width > 768 ? <img src={LogoDark} /> : <img src={LogoWhite} />}
          </div>
        </div>

        <div className="sidebar-bottom">
          <p>Location</p>
          <p>Destination</p>
          <HideOnMobile>Bus&nbsp;Location</HideOnMobile>
        </div>

        <SeparatorLine />

        <div className="form-wrapper">
          <form onSubmit={props.handleSubmit}>
            <div>
              <div className="direction-icon">
                <img src={directionIcon} />
              </div>
              <div className="input-fields-wrapper">
                <OriginInput id="origin">
                  {props.data.charCountOrigin < 2 ? (
                    <TextField
                      id="standard-basic"
                      name="origin"
                      label="Departure"
                      type="text"
                      style={{ width: "100%" }}
                      margin="dense"
                      inputProps={{ "data-testid": "origin" }}
                      value={origin}
                      onChange={handleChange}
                      autoFocus={true}
                      required={true}
                    />
                  ) : (
                    <Autocomplete
                      disablePortal
                      type="text"
                      name="origin"
                      style={{ width: "100%" }}
                      value={orig}
                      onChange={(event, newValue) => {
                        setOrig(newValue);
                        handleChangeAuto("origin", newValue);
                      }}
                      inputValue={origin}
                      onInputChange={(event, newInputValue) => {
                        setOrigin(newInputValue);
                        handleChangeAuto("origin", newInputValue);
                      }}
                      freeSolo={true}
                      options={originData.map((option) => option.label)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Departure"
                          autoFocus={true}
                          required={true}
                          inputProps={{
                            ...params.inputProps,
                            type: "search",
                            "data-testid": "origin",
                          }}
                        />
                      )}
                      required
                    />
                  )}
                </OriginInput>
                <DestinationInput id="destination">
                  {props.data.charCountDest < 2 ? (
                    <TextField
                      id="standard-basic"
                      inputProps={{ "data-testid": "destination" }}
                      value={destination}
                      type="text"
                      style={{ width: "100%" }}
                      name="destination"
                      label="Destination"
                      margin="normal"
                      onChange={handleChange}
                      autoFocus={true}
                      required={true}
                    />
                  ) : (
                    <Autocomplete
                      disablePortal
                      type="text"
                      name="destination"
                      style={{ width: "100%" }}
                      value={dst}
                      onChange={(event, newValue) => {
                        setDst(newValue);
                        handleChangeAuto("destination", newValue);
                      }}
                      inputValue={destination}
                      onInputChange={(event, newInputValue) => {
                        setDest(newInputValue);
                        handleChangeAuto("destination", newInputValue);
                      }}
                      freeSolo={true}
                      options={destinationData.map((option) => option.label)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Destination"
                          autoFocus={true}
                          required={true}
                          inputProps={{
                            ...params.inputProps,
                            type: "search",
                            "data-testid": "destination",
                          }}
                        />
                      )}
                    />
                  )}
                </DestinationInput>
              </div>
            </div>
          </form>
        </div>

        <BusDetails data-testid="bus-info">
          {props.data.isSubmitted ? (
            <div>
              <div className="bus-info">
                <RouteWrapper>
                  <div>route:</div>
                  <RouteName>
                    {props.data.origin} - {props.data.destination}
                  </RouteName>
                </RouteWrapper>
              </div>
            </div>
          ) : null}
        </BusDetails>


        <label className="tileLayerSwitcher">
          <Switch 
            data-testid="switch-btn"
            onChange={handleSwitch} 
            checked={typeof(state.isSwitched)=='undefined'?false :state.isSwitched}
            onColor="#d9e3e5"
            offColor="#171717"
            onHandleColor="#2693e6"
            handleDiameter={24}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            height={20}
            width={48}
            className="react-switch"
            id="icon-switch"
          
          />
        </label>
      </div>
    </div>
  );
};

SearchPanel.propTypes = {
  data: PropTypes.object,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  onSelect: PropTypes.func,
  onSearch: PropTypes.func,
  setState: PropTypes.func,
  handleSwitch:PropTypes.func,
};

export default SearchPanel;
