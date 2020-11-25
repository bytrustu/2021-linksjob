import React from 'react';
import Link from 'next/link';

const RealtimeComment = () => {
  return (
    <div className="realtime-comment">
      <div className="comment-wrap">
        <div className="list-header">
          <span>최근 코멘트 기업</span>
          <span>총 100 건</span>
        </div>
        <div className="list-content">
          <li className="list-item">
            <Link href="">
              <a className="ellipsis">가나다라마바사가나다라마바시사사ㅏ사사사사사</a>
            </Link>
            <span className="ellipsis">스타스타스타스타스타스타</span>
          </li>
          <li className="list-item">
            <Link href="">
              <a className="ellipsis">가나다라마바사가나다라마바시사사ㅏ사사사사사</a>
            </Link>
            <span className="ellipsis">스타스타스타스타스타스타</span>
          </li>
          <li className="list-item">
            <Link href="">
              <a className="ellipsis">가나다라마바사가나다라마바시사사ㅏ사사사사사</a>
            </Link>
            <span className="ellipsis">스타스타스타스타스타스타</span>
          </li>
          <li className="list-item">
            <Link href="">
              <a className="ellipsis">가나다라마바사가나다라마바시사사ㅏ사사사사사</a>
            </Link>
            <span className="ellipsis">스타스타스타스타스타스타</span>
          </li>
          <li className="list-item">
            <Link href="">
              <a className="ellipsis">가나다라마바사가나다라마바시사사ㅏ사사사사사</a>
            </Link>
            <span className="ellipsis">스타스타스타스타스타스타</span>
          </li>
          <li className="list-item">
            <Link href="">
              <a className="ellipsis">가나다라마바사가나다라마바시사사ㅏ사사사사사</a>
            </Link>
            <span className="ellipsis">스타스타스타스타스타스타</span>
          </li>
        </div>
      </div>
    </div>
  );
};

export default RealtimeComment;
