import React from 'react';
import Styled from '@emotion/styled';
import { Input } from 'antd';
import searchIcon from 'App/assets/images/search-icon.svg';

const SearchWrapper = Styled.div`
  border-radius: 5px;
  box-shadow: 2px 2px 3px darkgrey;
  background: white;
	z-index: 99999;
	position: absolute;
	top: 2em;
	left: 40%;
	display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 2em;
  @media (max-width: 768px) {
    border-radius: none;
    box-shadow: none;
    border: none;
    top: 5em;
    justify-content: center;
    padding: 0px 0.2em;
  }
`;

const SearchInput = Styled.div`
	flex: 1;
`;

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
}

export default SearchBox;
