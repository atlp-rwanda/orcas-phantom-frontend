import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import directionIcon from '../../../assets/images/direction-icon.svg';
import menuIcon from '../../../assets/images/menu-icon.svg';
import MapComponent from './MapComponent';
import { Consumer } from '../../App';


class LandingPage extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: -1.9470658,
      lng: 30.0915372,
      origin: "",
      destination: "",
      isSubmitted: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(Event) {
    const {name, value} = Event.target;

    this.setState({
      [name]: value
    });
  }

  handleClick(Event) {
    Event.preventDefault();

    this.setState({
      isSubmitted: false
    });

    if (this.state.origin && this.state.destination)
      this.setState({
        isSubmitted: true
      });
  }

  render() {
    return (
      <main data-testid="homepage" className="main-wrapper">
        <div className="sidebar">
          <div className="search-box">
            <div className="sidebar-top">
              <Consumer>
                {
                  ({ store, actions }) => (
                    store.isNavToggled ? null

                      : 

                      <div 
                        data-testid="menu-icon"
                        onClick={() => actions.toggleNav()}
                        className="menu-icon">
                        <img src={menuIcon} />
                      </div>
                  )}
              </Consumer>
              <div className="logo-txt">Phantom Ride</div>
              { this.state.isSubmitted ? 
                <div
                  data-testid="cancel-btn"
                  onClick={() => 
                    this.setState({
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
              <form onSubmit={this.handleClick}>
                <div>
                  <div className="direction-icon">
                    <img src={directionIcon} />
                  </div>
                  <div className="input-fields-wrapper">
                    <div id="origin">
                      { this.state.isSubmitted ?
                        <input
                          data-testid="origin"
                          type="text"
                          name="origin"
                          value={this.state.origin}
                          className="search-fields form-control text-center"
                          placeholder="Origin Bus Stop..."
                          disabled
                        />
                        : 
                        <input
                          data-testid="origin"
                          type="text"
                          name="origin"
                          value={this.state.origin}
                          onChange={this.handleChange}
                          className="search-fields form-control"
                          placeholder="Origin Bus Stop..."
                          required
                        />
                      }
                    </div>
                    <div id="destination">
                      { this.state.isSubmitted ?
                        <input
                          data-testid="destination"
                          type="text"
                          name="destination"
                          value={this.state.destination}
                          className="search-fields form-control text-center"
                          placeholder="Destination Bus Stop..."
                          disabled
                        />
                        :
                        <input
                          data-testid="destination"
                          type="text"
                          name="destination"
                          value={this.state.destination}
                          onChange={this.handleChange}
                          className="search-fields form-control"
                          placeholder="Destination Bus Stop..."
                          required
                        />
                      }
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  data-testid="search-btn"
                  name="search-btn"
                  className="btn btn-info btn-block search-btn">Search</button>
              </form>
            </div>
          </div>
          <div data-testid="bus-info" id="bus-details">
            { this.state.isSubmitted ? 
              <div>
                <small className="form-text text-muted">(Sample Data)</small>
                <div>Nearby Bus</div>
                <div className="bus-info">
                  <div className="bus-detail-wrapper">
                    <div><i className="fa fa-clock-o fa-lg"></i></div>
                    <div>
                      <div className="text-info time-remaining">10 min</div>
                      <div className="bus-detail">away from {this.state.origin} Bus Stop</div>
                    </div>
                  </div>
                  <div className="bus-detail-wrapper">
                    <div><i className="fa fa-bus fa-lg"></i></div>
                    <div className="bus-detail">RAC43353</div>
                  </div>
                  <div className="bus-detail-wrapper">
                    <div><i className="fa fa-map-marker fa-lg"></i></div>
                    <div className="bus-detail">Nyabugogo - {this.state.origin} - {this.state.destination}</div>
                  </div>
                </div>
              </div>
              
              : null}
          </div>
        </div>
        <div id="bus-map">
          <MapComponent lat={this.state.lat} lng={this.state.lng} />
        </div>
      </main>
    )
  }
}

export default LandingPage;
