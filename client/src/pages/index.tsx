import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchInput from '../components/SearchInput';
import RealtimeContainer from '../components/RealtimeContainer';
import RankingList from 'src/components/RankingList';
import { IRankData, ISearchData } from 'src/type/Interfaces';
import { isEmptyObject, range, testRegExp } from 'src/utils';
import AlertModal from '../components/Modal/AlertModal';
import ConfirmModal from '../components/Modal/ConfirmModal';
import ComapnyModal from '../components/Modal/CompanyModal';
import { searchRequestAction } from '../redux/reducers/companyReducer';
import { RootState } from '../redux/reducers';

const rankData: IRankData[] = [
  ...range(10, 1).map(v => ({
    name: `기업 이름${v}`,
    link: 'https://github.com/bytrustu',
    type: v % 4 === 0 ? 'normal' : (Math.random() > 0.5 ? 'up' : 'down'),
  })),
];

const IndexPage = () => {
  const dispatch = useDispatch();
  const { companySearchData } = useSelector((state: RootState) => state.company);
  const [searchText, setSearchText] = useState<string>('');
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
      return;
    }
    dispatch(searchRequestAction);
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


  return (
    <>
      <ComapnyModal visible={isCompanyVisible} setVisible={setIsCompanyVisible} />
      <AlertModal isVisible={isAlertVisible} setVisible={setIsAlertVisible} text="검색어가 잘못 되었습니다." />
      <ConfirmModal isVisible={isConfirmVisible} setVisible={setIsConfirmVisible} company={searchText} />
      <div className="main-content">
        <div className="title-wrap">
          <h1 className="main-title">기업의 채용정보가 필요할때,</h1>
          <h1 className="main-title"> 검색전에</h1>
        </div>
        <SearchInput searchText={searchText} onChangeSearchText={onChangeSearchText} onSubmitSearch={onSubmitSearch} />
        <RealtimeContainer />
      </div>
      <aside className="aside">
        <RankingList title="실시간 인기 기업" rankData={rankData} />
      </aside>
    </>
  );

};
export default IndexPage;