import React from "react";
import { Results } from "shared/styles/homepageStyles";
import { useContext } from "react";
import { AppContext } from "context/AppProvider";
// import L from "leaflet";


const Suggestions = (props) => {
  const { state, setState } = useContext(AppContext);
  const showLocation = (longLat) => {
    setState({
      ...state,
      sampleLocation: longLat
    })

  }
  // eslint-disable-next-line react/prop-types
  // const options = props.results.map((bs) => <p onClick= { showLocation([bs.coordinate.split(',')[1], bs.coordinate.split(',')[0]])
  // } key={bs.id}>{bs.busStopName}</p>);
  // eslint-disable-next-line react/prop-types
  const options = props.results.map((bs) => <p onClick= { () => showLocation([Number(bs.coordinate.split(',')[1])
    , Number(bs.coordinate.split(',')[0])])
  } key={bs.id}>{bs.busStopName}</p>);
  // eslint-disable-next-line react/prop-types
  // const options = props.results.map((bs) => {
  //   console.log([bs.coordinate.split(',')[1], bs.coordinate.split(',')[0]])
  //   return <p onClick= { showLocation([bs.coordinate.split(',')[1], bs.coordinate.split(',')[0]])
  //   } key={bs.id}>{bs.busStopName}</p>
  // }
  // )

  return <Results>{options}</Results>;
};

export default Suggestions;