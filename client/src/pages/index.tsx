import Link from 'next/link';
import Layout from '../components/Layout';
import React from 'react';
import { useDispatch } from 'react-redux';
import { LOAD_MAIN_COMPANY_POSTS_REQUEST } from '../redux/types';
import SearchInput from 'src/components/Layout/SearchInput';

const IndexPage = () => {
  const dispatch = useDispatch();
  dispatch({
    type: LOAD_MAIN_COMPANY_POSTS_REQUEST,
  });
  return (
    <>
      <div className="title-wrap">
        <h1 className="main-title">기업의 채용정보가 필요할때,</h1>
        <h1 className="main-title"> 검색전에</h1>
      </div>
      <SearchInput/>
      <section className="realtime-wrap">
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
      </section>
    </>
  );

};
export default IndexPage;