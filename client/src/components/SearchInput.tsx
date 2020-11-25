import React, { FC } from 'react';

const SearchInput:FC = () => {
  return (
    <section className="search-wrap">
      <input type="search" name="keyword" placeholder="기업을 검색해보세요!" autoComplete="off"/>
      <img src="/image/search.svg" />
    </section>
  );
};

export default SearchInput;
