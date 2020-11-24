import React, { FC } from 'react';
import Link from 'next/link';

const Footer: FC = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-warp">
          <div className="footer-notice">
            <p className="text-over">
              <strong>NOTICE</strong>
              <Link href="/">
                <a>공지사항 테스트 입니다.</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-warp">
          <div className="footer-inner">
            <ul className="footer-lst">
              <li className="footer-item">
                <Link href="/">
                  <a className="footer-link">QNA</a>
                </Link>
              </li>
              <li className="footer-item">
                <Link href="/">
                  <a className="footer-link">FAQ</a>
                </Link>
              </li>
              <li className="footer-item">
                <Link href="/">
                  <a className="footer-link"><strong>개인정보 처리방침</strong></a>
                </Link>
              </li>
            </ul>
            <ul className="footer-sub-lst">
              <li className="footer-sub">
                <Link href="https://github.com/bytrustu">
                  <a target="_blank">
                    <span>GITHUB SITE</span>
                  </a>
                </Link>
              </li>
              <li className="footer-sub">
                <Link href="https://github.com/bytrustu/linksjob">
                  <a target="_blank">
                    <span>PROJECT SITE</span>
                  </a>
                </Link>
              </li>
            </ul>
            <p className="copyright">© bytrustu. All rights reserved.</p>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
