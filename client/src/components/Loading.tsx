// @ts-ignore
import React, { FC } from 'react';
import { range } from '../utils';

type Props = {
  status: boolean;
}
const Loading: FC<Props> = ({ status }) => {
  // @ts-ignore
  const arr: [number] = range(20);
  return status ? (
    <div className="back">
      <div className="loading-wrap">
        <p className="loading-text">자료를 수집중입니다.</p>
        <div className="loader">
          {
            arr.map(_ => <span className="loader-element" />)
          }
        </div>
      </div>
    </div>
  ) : null;
};

// @ts-ignore
export default Loading;