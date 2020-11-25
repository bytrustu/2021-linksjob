import React from 'react';
import { useDispatch } from 'react-redux';
import { LOAD_MAIN_COMPANY_POSTS_REQUEST } from '../redux/types';
import SearchInput from '../components/SearchInput';
import RealtimeContainer from '../components/RealtimeContainer';
import RankingList from 'src/components/RankingList';
import { IRankData } from 'src/type/Interfaces';
import { range } from 'src/utils';

const rankData: IRankData[] = [
  ...range(10, 1).map(v => ({
    name: `기업 이름${v}`,
    link: 'https://github.com/bytrustu',
    type: v % 4 === 0 ? 'normal' : (Math.random() > 0.5 ? 'up' : 'down'),
  })),
];

const IndexPage = () => {
  const dispatch = useDispatch();
  dispatch({
    type: LOAD_MAIN_COMPANY_POSTS_REQUEST,
  });
  return (
    <>
      <div className="main-content">
        <div className="title-wrap">
          <h1 className="main-title">기업의 채용정보가 필요할때,</h1>
          <h1 className="main-title"> 검색전에</h1>
        </div>
        <SearchInput />
        <RealtimeContainer />
      </div>
      <aside className="aside">
        <RankingList title="실시간 인기 기업" rankData={rankData} />
      </aside>
    </>
  );

};
export default IndexPage;