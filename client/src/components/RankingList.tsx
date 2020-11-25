import React, { FC } from 'react';
import Link from 'next/link';
import { IRankData } from 'src/type/Interfaces'


type Props = {
  title: string,
  rankData: IRankData[]
}

const RankingList: FC<Props> = ({ title, rankData }) => {
  return (
    <div className="aside-ranking">
      <h1>{title}</h1>
      <ul className="inner">
        {
          rankData.map((item: IRankData, index: number) => (
            <li className="rank" key={item.name}>
              <span className={`status ${item.type}`}/>
              <em>{index + 1}</em>
              <Link href={item.link}>
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
