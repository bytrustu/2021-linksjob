import React, { FC, useEffect, useState } from 'react';
import { range } from '../utils';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/reducers';

const Loading: FC = () => {

  const [loadingText, setLoadingText] = useState<string>('');
  const { loginUserLoading, userLoading } = useSelector((state: RootState) => state.user);
  const { companySearchLoading } = useSelector((state: RootState) => state.company);

  useEffect(() => {
    if (loginUserLoading || userLoading) {
      setLoadingText('로딩 중입니다.');
    }
    if (companySearchLoading) {
      setLoadingText('자료를 수집 중입니다.');
    }
  }, [loginUserLoading, companySearchLoading]);

  // @ts-ignore
  const arr: [number] = range(20);
  return loginUserLoading || userLoading || companySearchLoading ? (
    <div className="back">
      <div className="loading-wrap">
        <p className="loading-text">{loadingText}</p>
        <div className="loader">
          {
            arr.map(_ => <span className="loader-element" />)
          }
        </div>
      </div>
    </div>
  ) : null;
};

export default Loading;