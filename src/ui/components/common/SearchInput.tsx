import React from 'react';
import styled from 'styled-components';

type SearchInputType = {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  searchOwnerList: string[];
  isSearchOwnerList: boolean;
  onIsSearchOwnerList: (isSearchOwnerList: boolean) => void;
  onSearchOwnerClick: (owner: string) => void;
  [key: string]: any;
}
const SearchInput = ({
  name,
  value,
  onChange,
  placeholder,
  searchOwnerList,
  isSearchOwnerList,
  onIsSearchOwnerList,
  onSearchOwnerClick,
}: SearchInputType) => {
  const handleFocusOut = () => {
    setTimeout(() => {
      onIsSearchOwnerList(false);
    }, 500);
  };
  return (
    <Container>
      <Input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onBlur={handleFocusOut}
      />
      {
        isSearchOwnerList && searchOwnerList.length > 0 && (
          <SearchList>
            {
              searchOwnerList.map((owner) => (
                <SearchItem
                  key={owner}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onSearchOwnerClick(owner);
                  }}
                >{owner}</SearchItem>
              ))
            }
          </SearchList>
        )
      }
    </Container>
  );
};

export default SearchInput;

const Container = styled.div`
  position: relative;
  width: 80%;
`;

const SearchList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  z-index: 1;
  padding: 10px 0;
`;

const SearchItem = styled.li`
  padding: 10px;
  cursor: pointer;
  list-style: none;
  &:hover {
    background: #e5e5e5;
  }
`;

const Input = styled.input<{height?: string}>`
  width: 80%;
  height: ${props => props?.height || 'auto'};
  padding: 0 10px;
  border: unset;
  border-radius: 5px;
  outline: none;
`;
