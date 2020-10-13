import React, { useContext } from 'react';
import './css/style.css';
import directionIcon from 'App/assets/images/direction-icon.svg';
import menuIcon from 'App/assets/images/menu-icon.svg';
import MapComponent from './MapComponent';
import { AppContext } from 'context/AppProvider';
import SideMenu from './SideMenu';
import { Button, Input } from 'antd';


const LandingPage = () => {

  const { state, setState } = useContext(AppContext);
    
  const handleChange = Event => {
    const { name, value } = Event.target;

    setState({
      ...state,
      [name]: value
    });
  }

  const handleClick = Event => {
    Event.preventDefault();

    setState({
      ...state,
      isSubmitted: true
    });
  }

  return (
    <main data-testid="homepage" className="main-wrapper">
      <div className="sidebar">
        <div className="search-box">
          <div className="sidebar-top">
            {
              state.isNavToggled ? <SideMenu />

                :

                <div
                  data-testid="menu-icon"
                  onClick={() => setState({
                    ...state,
                    isNavToggled: !state.isNavToggled
                  })}
                  className="menu-icon">
                  <img src={menuIcon} />
                </div>
            }
            <div className="logo-txt">Phantom Ride</div>
            { state.isSubmitted ?
              <div
                data-testid="cancel-btn"
                onClick={() =>
                  setState({
                    ...state,
                    origin: "",
                    destination: "",
                    isSubmitted: false
                  })
                }
                className="cancel-btn">
                <i className="fa fa-close fa-lg" style={{color: "white"}}></i></div>
              : <div data-testid="cancel-btn"></div> }
          </div>

          <div className="form-wrapper">
            <form onSubmit={handleClick}>
              <div>
                <div className="direction-icon">
                  <img src={directionIcon} />
                </div>
                <div className="input-fields-wrapper">
                  <div id="origin">
                    { state.isSubmitted ?
                      <Input
                        data-testid="origin"
                        type="text"
                        name="origin"
                        value={state.origin}
                        className="search-fields"
                        size="large"
                        bordered="false"
                        placeholder="Origin Bus Stop..."
                        disabled={true}
                      />
                      :
                      <Input
                        data-testid="origin"
                        type="text"
                        name="origin"
                        value={state.origin}
                        onChange={handleChange}
                        className="search-fields"
                        size="large"
                        bordered="false"
                        allowClear="true"
                        placeholder="Origin Bus Stop..."
                        required
                      />
                    }
                  </div>
                  <div id="destination">
                    { state.isSubmitted ?
                      <Input
                        data-testid="destination"
                        type="text"
                        name="destination"
                        value={state.destination}
                        className="search-fields"
                        size="large"
                        bordered="false"
                        placeholder="Destination Bus Stop..."
                        disabled={true}
                      />
                      :
                      <Input
                        data-testid="destination"
                        type="text"
                        name="destination"
                        value={state.destination}
                        onChange={handleChange}
                        className="search-fields"
                        size="large"
                        bordered="false"
                        allowClear="true"
                        placeholder="Destination Bus Stop..."
                        required
                      />
                    }
                  </div>
                </div>
              </div>
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                block="true"
                data-testid="search-btn"
                name="search-btn"
                className="search-btn">Search</Button>
            </form>
          </div>
        </div>
        <div data-testid="bus-info" id="bus-details">
          { state.isSubmitted ?
            <div>
              <small className="form-text text-muted">(Sample Data)</small>
              <div>Nearby Bus</div>
              <div className="bus-info">
                <div className="bus-detail-wrapper">
                  <div><i className="fa fa-clock-o fa-lg"></i></div>
                  <div>
                    <div className="text-info time-remaining">10 min</div>
                    <div className="bus-detail">away from {state.origin} Bus Stop</div>
                  </div>
                </div>
                <div className="bus-detail-wrapper">
                  <div><i className="fa fa-bus fa-lg"></i></div>
                  <div className="bus-detail">RAC43353</div>
                </div>
                <div className="bus-detail-wrapper">
                  <div><i className="fa fa-map-marker fa-lg"></i></div>
                  <div className="bus-detail">Nyabugogo - {state.origin} - {state.destination}</div>
                </div>
              </div>
            </div>

            : null}
        </div>
      </div>
      <div id="bus-map">
        <MapComponent lat={state.lat} lng={state.lng} />
      </div>
    </main>
  );
}


export default LandingPage;
