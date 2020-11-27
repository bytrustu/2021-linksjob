import React, { FC } from 'react';
import RealtimeCompany from 'src/components/RealtimeCompany';
import RealtimeComment from 'src/components/RealtimeComment';

type RealtimeContainerType = {
  realtimeKeywordData: any;
  onClickSearchComapny: void;
}

const RealtimeContainer: FC<RealtimeContainerType> = ({ realtimeKeywordData, onClickSearchComapny }) => {
  return (
    <section className="realtime-wrap">
      <RealtimeCompany realtimeKeywordData={realtimeKeywordData} onClickSearchComapny={onClickSearchComapny}/>
      <RealtimeComment />
    </section>
  );
};

// @ts-ignore
export default RealtimeContainer;
