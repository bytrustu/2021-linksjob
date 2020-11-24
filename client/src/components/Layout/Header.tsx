import React, { FC } from 'react';
import Link from 'next/link';
import Button from '../Button';

const Header: FC = () => {
  return (
    <header className="header">

      <div className="header-warp">
        <h1>
          <Link href="">
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
          <Button type="danger" value="스크랩"/>
          <Button type="ghost" value="로그인"/>
        </div>

      </div>
    </header>
  );
};

export default Header;
