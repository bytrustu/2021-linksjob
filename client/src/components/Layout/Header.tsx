import React, { FC, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserAction } from '../../redux/reducers/userReducer';
import { RootState } from '../../redux/reducers';

const Header: FC = () => {

  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const moveLogin = () => {
    Router.push('/login');
  };

  const onLogout = () => {
    dispatch(logoutUserAction());
  }

  return (
    <header className="header">
      <div className="header-warp">
        <h1>
          <Link href="/">
            <a>
              <span>LINKS</span>
              <span>JOB</span>
            </a>
          </Link>
        </h1>

        <div className="button-group">
          <Button type="primary">스크랩</Button>
          {
            isAuthenticated
              ?
              <Button onClick={onLogout} type="danger">로그아웃</Button>
              :
              <Button onClick={moveLogin}>로그인</Button>
          }
        </div>

      </div>
    </header>
  );
};

export default Header;
