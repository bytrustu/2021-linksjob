import React, { FC } from 'react';
import Link from 'next/link';

type RealtimeCompanyType = {
  realtimeKeywordData: any;
  onClickSearchComapny: any;
}

const RealtimeCompany:FC<RealtimeCompanyType> = ({ realtimeKeywordData, onClickSearchComapny }) => {

  return (
    <div className="realtime-company">
      <div className="list-header">
        <span>실시간 검색 기업</span>
      </div>
      <ul className="list-content">
        <li>
          {
            realtimeKeywordData && realtimeKeywordData.map((value: { name: React.ReactNode; }, index: number) => (
              <Link href="" key={index}>
                <a className="ellipsis" onClick={() => onClickSearchComapny(value.name)}>{value.name}</a>
              </Link>
            ))
          }
        </li>
      </ul>
    </div>
  );
};

export default RealtimeCompany;
