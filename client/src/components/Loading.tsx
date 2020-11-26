// @ts-ignore
import React, { FC, useEffect, useState } from 'react';
import { range } from '../utils';
import { useSelector } from 'react-redux';
import { UserAction } from '../redux/reducers/userReducer';
import { CompanyAction } from '../redux/reducers/companyReducer';

const Loading: FC = () => {

  const [loadingText, setLoadingText] = useState('');
  const { loginUserLoading } = useSelector((state: UserAction) => state.user);
  const { companySearchLoading } = useSelector((state: CompanyAction) => state.company);

  useEffect(() => {
    if (loginUserLoading) {
      setLoadingText('로딩 중입니다.');
    }
    if (companySearchLoading) {
      setLoadingText('자료를 수집 중입니다.');
    }
  }, [loginUserLoading, companySearchLoading]);

  // @ts-ignore
  const arr: [number] = range(20);
  return loginUserLoading || companySearchLoading ? (
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

// @ts-ignore
export default Loading;