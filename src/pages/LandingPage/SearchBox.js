import React from "react";
import { Input } from "antd";
import searchIcon from "App/assets/images/search-icon.svg";
import { SearchWrapper, SearchInput } from "shared/styles/homepageStyles";

const SearchBox = () => {
  return (
    <SearchWrapper>
      <SearchInput>
        <Input
          type="text"
          placeholder="Search..."
          size="large"
          bordered={false}
          allowClear={true}
        />
      </SearchInput>
      <div>
        <img src={searchIcon} />
      </div>
    </SearchWrapper>
  );
};

export default SearchBox;
