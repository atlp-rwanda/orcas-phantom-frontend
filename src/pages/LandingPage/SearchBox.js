import React from "react";
import { Input } from "antd";
import searchIcon from "App/assets/images/search-icon.svg";
import { SearchWrapper, SearchInput } from "shared/styles/homepageStyles";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "context/AppProvider";
import L from "leaflet";

import Suggestions from "./Suggestions";

const SearchBox = () => {
  const { map, busStopMarker } = useContext(AppContext);
  const [searchState, setSearchState] = useState({
    error: false,
    query: "",
    results: [],
    currentLocationMarker: null,
  });

  const getInfo = () => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://phantom-backend.herokuapp.com/searchbusstop?bstop=${searchState.query}`
      )
      .then((res) => {
        console.log(res.data.busStops);
        setSearchState({
          ...searchState,
          results: res.data.busStops,
        });
      })
      .catch((e) => {
        setSearchState({
          ...searchState,
          error: true,
        });
        console.log(e);
      });
  };

  // fetch new suggestions
  useEffect(() => {
    if (searchState.query && searchState.query.length > 2) {
      getInfo();
    } else {
      setSearchState({
        ...searchState,
        results: [],
      });
    }
  }, [searchState.query]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    if (e.type === "click") {
      handleClear();
    }
    setSearchState({
      ...searchState,
      currentLocationMarker: null,
      query: value,
    });
    console.log(searchState.currentLocationMarker);
  };

  const handleSelectedLocation = (selectedLocation) => {
    const marker = L.marker(selectedLocation);
    const mb = [marker.getLatLng()];
    const markerBound = L.latLngBounds(mb);
    marker.addTo(map);
    map.fitBounds(markerBound);

    setSearchState({
      ...searchState,
      currentLocationMarker: marker,
    });
  };

  const handleClear = () => {
    map.removeLayer(searchState.currentLocationMarker);
    map.fitBounds(busStopMarker.getBounds());
  };

  return (
    <SearchWrapper>
      <div style={{ display: "flex" }}>
        <SearchInput>
          <Input
            type="text"
            placeholder="Search..."
            size="large"
            bordered={false}
            allowClear={true}
            value={searchState.query}
            onChange={(e) => handleInputChange(e)}
          />
        </SearchInput>
        <div>
          <img style={{ paddingTop: "15px" }} src={searchIcon} />
        </div>
      </div>

      {searchState.currentLocationMarker ? null : (
        <Suggestions
          handleSelectedLocation={handleSelectedLocation}
          query={searchState.query}
          results={searchState.results}
        />
      )}
    </SearchWrapper>
  );
};

export default SearchBox;
