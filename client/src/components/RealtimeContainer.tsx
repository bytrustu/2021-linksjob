import React, { FC } from 'react';
import RealtimeCompany from 'src/components/RealtimeCompany';
import RealtimeComment from 'src/components/RealtimeComment';

const RealtimeContainer:FC = () => {
  return (
    <section className="realtime-wrap">
      <RealtimeCompany/>
      <RealtimeComment/>
    </section>
  );
};

// @ts-ignore
export default RealtimeContainer;
