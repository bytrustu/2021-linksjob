import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';
import SearchInput from '../components/SearchInput';
import RealtimeContainer from '../components/RealtimeContainer';
import RankingList from '../components/RankingList';
import { ISearchData } from '../type/Interfaces';
import AlertModal from '../components/Modal/AlertModal';
import ConfirmModal from '../components/Modal/ConfirmModal';
import ComapnyModal from '../components/Modal/CompanyModal';
import {
  loadFavoriteCompanyAction,
  loadRankAction,
  loadRealtimeSearchAction,
  searchRequestAction,
} from '../redux/reducers/companyReducer';
import { isEmptyObject, range, testRegExp } from '../utils';
import { noMatchRegExpKeyword, searchError } from '../utils/const';
import { RootState } from '../redux/reducers';
import wrapper from '../store/configureStore';
import { loadUserAction } from '../redux/reducers/userReducer';

const IndexPage = () => {
  const dispatch = useDispatch();
  const { companySearchData, companySearchLoading, companySearchError, loadRankData, loadRealtimeSearchData } = useSelector((state: RootState) => state.company);
  const [searchText, setSearchText] = useState<string>('');
  const [alertText, setAlertText] = useState<string>('');
  const [searchData, setSearchData] = useState<ISearchData | {}>({});
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState<boolean>(false);
  const [isCompanyVisible, setIsCompanyVisible] = useState<boolean>(false);

  const onChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const onSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!testRegExp('keyword', searchText)) {
      setIsAlertVisible(true);
      setAlertText(noMatchRegExpKeyword);
      return;
    } else {
      setAlertText('');
    }
    dispatch(searchRequestAction(searchText));
  };

  const onClickSearchComapny = (keyword: string):any => {
    setSearchText(keyword);
    dispatch(searchRequestAction(keyword));
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
  }, [companySearchData]);

  useEffect(() => {
    if (companySearchError) {
      setAlertText(searchError);
      setIsAlertVisible(true);
    }
  }, [companySearchError]);

  return (
    <>
      <ComapnyModal visible={isCompanyVisible} setVisible={setIsCompanyVisible} keyword={searchText} />
      <AlertModal isVisible={isAlertVisible} setVisible={setIsAlertVisible} text={alertText} />
      <ConfirmModal isVisible={isConfirmVisible} setVisible={setIsConfirmVisible} company={searchText} />
      <div className="main-content">
        <div className="title-wrap">
          <h1 className="main-title">기업의 채용정보가 필요할때,</h1>
          <h1 className="main-title"> 검색전에</h1>
        </div>
        <SearchInput searchText={searchText} onChangeSearchText={onChangeSearchText} onSubmitSearch={onSubmitSearch} />
        <RealtimeContainer realtimeKeywordData={loadRealtimeSearchData} onClickSearchComapny={onClickSearchComapny} />
      </div>
      <aside className="aside">
        <RankingList title="실시간 인기 기업" rankData={loadRankData} onClickSearchComapny={onClickSearchComapny} />
      </aside>
    </>
  );

};

export default IndexPage;

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookies = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookies) {
    axios.defaults.headers.Cookie = cookies;
  }
  context.store.dispatch(loadUserAction());
  context.store.dispatch(loadRankAction());
  context.store.dispatch(loadRealtimeSearchAction());
  context.store.dispatch(loadFavoriteCompanyAction());
  context.store.dispatch(END);
  // @ts-ignore
  await context.store.sagaTask.toPromise();
});