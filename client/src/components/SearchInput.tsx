import React, { FC, useMemo } from 'react';

type SearchInputType = {
  searchText: string,
  onChangeSearchText: any,
  onSubmitSearch: any,
}

const SearchInput: FC<SearchInputType> = ({ searchText, onChangeSearchText, onSubmitSearch }) => (
  <section className="search-wrap">
    <form onSubmit={onSubmitSearch}>
      <input
        type="search"
        name="keyword"
        placeholder="기업을 검색해보세요!"
        autoComplete="off"
        value={searchText}
        onChange={onChangeSearchText}
      />
    </form>
    <img src="/image/search.svg" />
  </section>
);

export default SearchInput;
