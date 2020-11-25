import React, { FC } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Button } from 'antd';

const Header: FC = () => {

  const moveLogin = () => {
    Router.push('/login');
  };

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

        {/*<div className="header-nav">*/}
        {/*  <ul>*/}
        {/*    <li>*/}
        {/*      <Link href="/">*/}
        {/*        <a>홈</a>*/}
        {/*      </Link>*/}
        {/*    </li>*/}
        {/*    <li>*/}
        {/*      <Link href="/">*/}
        {/*        <a>코멘트</a>*/}
        {/*      </Link>*/}
        {/*    </li>*/}
        {/*  </ul>*/}
        {/*</div>*/}

        <div className="button-group">
          <Button type="primary">스크랩</Button>
          <Button onClick={moveLogin}>로그인</Button>
        </div>

      </div>
    </header>
  );
};

export default Header;
