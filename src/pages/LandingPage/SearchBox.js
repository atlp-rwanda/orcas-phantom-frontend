import React, { useEffect, useState } from "react";
import { Input } from "antd";
import searchIcon from "App/assets/images/search-icon.svg";
import { SearchWrapper, SearchInput } from "shared/styles/homepageStyles";
import axios from "axios";

import Suggestions from "./Suggestions";

const SearchBox = () => {
  const [searchState, setSearchState] = useState({
    error: false,
    query: "",
    results: [],
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
      // console.log(searchState.query);
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
    setSearchState({
      ...searchState,
      query: value,
    });
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
        <div >
          <img style={{ paddingTop:"15px"}} src={searchIcon} />
        </div>
      </div>
      <Suggestions results={searchState.results} />
    </SearchWrapper>
  );
};

export default SearchBox;