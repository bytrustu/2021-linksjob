import React, { FC } from 'react';
import Link from 'next/link';
import { IRankData } from 'src/type/Interfaces'


type Props = {
  title: string,
  rankData: IRankData[] | null,
  onClickSearchComapny: any,
}

const RankingList: FC<Props> = ({ title, rankData, onClickSearchComapny }) => {
  return (
    <div className="aside-ranking">
      <h1>{title}</h1>
      <ul className="inner">
        {
          rankData && rankData.map((item: IRankData, index: number) => (
            <li className="rank" key={item.name} onClick={() => onClickSearchComapny(item.name)}>
              <span className={`status ${item.status}`}/>
              <em>{index + 1}</em>
              <Link href="">
                <a>{item.name}</a>
              </Link>
            </li>
          ))
        }
      </ul>
      <p>실시간으로 많이 검색된 기업 순위</p>
    </div>
  );
};

export default RankingList;
