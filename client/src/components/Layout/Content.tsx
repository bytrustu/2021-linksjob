import React, { FC, ReactElement } from 'react';
import Link from 'next/link';
import RankingList from 'src/components/Layout/RankingList';
import { IRankData } from '../../type/Interfaces';
import { range } from '../../utils';
import Loading from '../Loading';

interface Props {
  children: ReactElement;
}

const rankData:IRankData[] = [
  ...range(10, 1).map(v => ({
    name: `회사이름${v}`,
    link: 'https://github.com/bytrustu',
    type: v % 4 === 0 ? 'normal' : (Math.random() > 0.5 ? 'up' : 'down')
  }))
];

const Content: FC<Props> = ({ children }) => {
  return (
    <section className="container">
      <div className="wrap">
        <div className="main-content">
          {children}
        </div>
        <aside className="aside">
          <RankingList title="실시간 검색 회사" rankData={rankData}/>
        </aside>
      </div>
    </section>
  );
};

export default Content;
