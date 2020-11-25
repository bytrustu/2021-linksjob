import React from 'react';
import Link from 'next/link';

const RealtimeCompany = () => {
  return (
    <div className="realtime-company">
      <div className="list-header">
        <span>실시간 검색 기업</span>
      </div>
      <ul className="list-content">
        <li>
          <Link href="">
            <a className="ellipsis">가나다라마바사가나다라마바시사사ㅏ사사사사사</a>
          </Link>
          <Link href="">
            <a className="ellipsis">가나다라마바사가나다라마바시사사ㅏ사사사사사</a>
          </Link>
          <Link href="">
            <a className="ellipsis">가나다라마바사가나다라마바시사사ㅏ사사사사사</a>
          </Link>
          <Link href="">
            <a className="ellipsis">가나다라마바사가나다라마바시사사ㅏ사사사사사</a>
          </Link>
          <Link href="">
            <a className="ellipsis">가나다라마바사가나다라마바시사사ㅏ사사사사사</a>
          </Link>
          <Link href="">
            <a className="ellipsis">가나다라마바사가나다라마바시사사ㅏ사사사사사</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default RealtimeCompany;
