import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmptyObject, testRegExp } from '../utils';
import AlertModal from './Modal/AlertModal';
import ConfirmModal from './Modal/ConfirmModal';
import ComapnyModal from './Modal/CompanyModal';
import { SEARCH_COMPANY_REQUEST } from '../redux/types';

const SearchInput: FC = () => {
  const dispatch = useDispatch();
  const { companySearchData } = useSelector(state => state.company);
  const [searchText, setSearchText] = useState('');
  const [searchData, setSearchData] = useState({});
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isCompanyVisible, setIsCompanyVisible] = useState(false);

  const onChangeSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const onSubmitSearch = (e) => {
    e.preventDefault();
    if (!testRegExp('keyword', searchText)) {
      setIsAlertVisible(true);
      return;
    }
    dispatch({
      type: SEARCH_COMPANY_REQUEST,
      data: searchText,
    });
  };

  useEffect(() => {
    const isEmptyData = isEmptyObject(companySearchData);
    if (isEmptyData && searchText.length > 0) {
      setIsCompanyVisible(false);
      setIsConfirmVisible(true);
      setSearchData({});
    }

    if (!isEmptyData && searchText.length > 0) {
      setSearchData({ ...setSearchData });
      setIsCompanyVisible(true);
    }

    setSearchText('');
  }, [companySearchData]);


  return (<>
      <ComapnyModal visible={isCompanyVisible} setVisible={setIsCompanyVisible} />
      <AlertModal isVisible={isAlertVisible} setVisible={setIsAlertVisible} text="검색어가 잘못 되었습니다." />
      <ConfirmModal isVisible={isConfirmVisible} setVisible={setIsConfirmVisible} company={searchText} />
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
    </>
  );
};

export default SearchInput;
