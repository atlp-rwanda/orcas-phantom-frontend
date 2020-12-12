import React from "react";
import { Results } from "shared/styles/homepageStyles";
import PropTypes from "prop-types";

const Suggestions = (props) => {
  const showLocation = (longLat) => {
    if (longLat.length > 0) {
      props.handleSelectedLocation(longLat);
    }
  };
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
  return <Results>{options}</Results>;
};

Suggestions.propTypes = {
  results: PropTypes.object,
  handleSelectedLocation: PropTypes.func,

};

export default Suggestions;