import React from 'react';
import Link from 'next/link';

const RealtimeComment = () => {
  return (
    <div className="realtime-comment">
      <div className="comment-wrap">
        <div className="list-header">
          <span>최근 코멘트 기업</span>
          <span>총 0 건</span>
        </div>
        <div className="list-content">
          <li className="list-item">
            <Link href="">
              <a className="ellipsis">추가예정 입니다.</a>
            </Link>
            <span className="ellipsis">기업명</span>
          </li>
        </div>
      </div>
    </div>
  );
};

export default RealtimeComment;
