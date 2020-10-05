import React from 'react';
import SideMenu from './site/sideMenu';
import '../css/App.css';

export const { Provider, Consumer } = React.createContext();

export const stateForTest = {
  store: {
    lat: -1.9470658,
    lng: 30.0915372,
    origin: "",
    destination: "",
    isSubmitted: false,
    isNavToggled: false
  },
  actions: {
    toggleNav: () => {
      this.setState({ store: {
        isNavToggled: !this.state.store.isNavToggled }
      });
    }
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      store: {
        lat: -1.9470658,
        lng: 30.0915372,
        origin: "",
        destination: "",
        isSubmitted: false,
        isNavToggled: false
      },
      actions: {
        toggleNav: () => {
          this.setState({ store: {
            isNavToggled: !this.state.store.isNavToggled }
          });
        }
      }
    };
  }

  render() {
    return (
      <Provider value={this.state}>
        <SideMenu />
      </Provider>
    );
  }
}

export default App;
