import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchInput from '../components/SearchInput';
import RealtimeContainer from '../components/RealtimeContainer';
import RankingList from 'src/components/RankingList';
import { IRankData, ISearchData } from 'src/type/Interfaces';
import AlertModal from '../components/Modal/AlertModal';
import ConfirmModal from '../components/Modal/ConfirmModal';
import ComapnyModal from '../components/Modal/CompanyModal';
import Loading from '../components/Loading';
import { loadRankAction, loadRealtimeSearchAction, searchRequestAction } from '../redux/reducers/companyReducer';
import { isEmptyObject, range, testRegExp } from '../utils';
import { noMatchRegExpKeyword, searchError } from '../utils/const';
import { RootState } from '../redux/reducers';


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

  const onClickSearchComapny = (keyword: string) => {
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
    dispatch(loadRankAction());
    dispatch(loadRealtimeSearchAction());
  }, []);

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
        <RealtimeContainer realtimeKeywordData={loadRealtimeSearchData} onClickSearchComapny={onClickSearchComapny}/>
      </div>
      <aside className="aside">
        <RankingList title="실시간 인기 기업" rankData={loadRankData} onClickSearchComapny={onClickSearchComapny}/>
      </aside>
    </>
  );

};
export default IndexPage;