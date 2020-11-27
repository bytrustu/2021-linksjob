import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserAction } from '../../redux/reducers/userReducer';
import { RootState } from '../../redux/reducers';
import FavoriteModal from '../Modal/FavoriteModal';
import AlertModal from '../Modal/AlertModal';

const Header: FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const [isFavoriteVisible, setIsFavoriteVisible] = useState<boolean>(false);
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
  const dispatch = useDispatch();

  const moveLogin = () => {
    Router.push('/login');
  };

  const onLogout = () => {
    dispatch(logoutUserAction());
  };

  const onClickFavorite = () => {
    if (isAuthenticated) {
      setIsFavoriteVisible(true);
    } else {
      setIsAlertVisible(true);
    }
  }

  return (
    <>
      <AlertModal isVisible={isAlertVisible} setVisible={setIsAlertVisible} text='로그인 정보가 필요 합니다.' />
      <FavoriteModal visible={isFavoriteVisible} setVisible={setIsFavoriteVisible}/>
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
            <Button type="primary" onClick={onClickFavorite}>스크랩</Button>
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
    </>
  );
};

export default Header;
