import React from "react";
import { Results } from "shared/styles/homepageStyles";

const Suggestions = (props) => {
  const showLocation = (longLat) => {
    if (longLat.length > 0) {
      // eslint-disable-next-line react/prop-types
      props.handleSelectedLocation(longLat);
    }
  };

  // eslint-disable-next-line react/prop-types
  // if (props.query.length === 0) {

  // }
  // eslint-disable-next-line react/prop-types
  // const options = props.results.map((bs) => <p onClick= { showLocation([bs.coordinate.split(',')[1], bs.coordinate.split(',')[0]])
  // } key={bs.id}>{bs.busStopName}</p>);
  // eslint-disable-next-line react/prop-types
  const options = props.results.map((bs) => (
    <p
      onClick={() =>
        showLocation([
          Number(bs.coordinate.split(",")[1]),
          Number(bs.coordinate.split(",")[0]),
        ])
      }
      key={bs.id}
    >
      {bs.busStopName}
    </p>
  ));
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
