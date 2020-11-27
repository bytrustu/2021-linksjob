import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_USER_REQUEST } from '../../redux/types';
import { IUserData } from '../../type/Interfaces';
import wrapper from 'src/store/configureStore';
import axios from 'axios';
import { loadUserAction } from 'src/redux/reducers/userReducer';
import { END } from 'redux-saga';
import Router from 'next/router';
import AlertModal from 'src/components/Modal/AlertModal';
import { RootState } from '../../redux/reducers';

const Login: FC = () => {

  const { register, errors, handleSubmit } = useForm();
  const [errorFromSubmit, setErrorFromSubmit] = useState<string>('');
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);

  const dispatch = useDispatch();
  const { isAuthenticated, userErrorMsg } = useSelector((state: RootState) => state.user);

  const onSubmit = (data: IUserData) => {
    try {
      dispatch({ type: LOGIN_USER_REQUEST, data });
    } catch (e) {
      setErrorFromSubmit(e.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      Router.push('/');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (userErrorMsg) {
      setIsAlertVisible(true);
    }
  }, [userErrorMsg]);

  return (
    <>
      <AlertModal setVisible={setIsAlertVisible} isVisible={isAlertVisible} text={userErrorMsg} />
      <div className="auth-wrap">
        <div style={{ textAlign: 'center' }}>
          <h3>아이디 로그인</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>이메일</label>
          <input
            name="email"
            type="email"
            ref={register({ required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && <p>이메일이 잘못 되었습니다.</p>}
          <label>비밀번호</label>
          <input
            name="password"
            type="password"
            ref={register({ required: true, minLength: 6 })}
          />
          {errors.password && errors.password.type === 'required' && <p>비밀번호는 필수 입력값 입니다.</p>}
          {errors.password && errors.password.type === 'minLength' && <p>비밀번호는 최소 6자리 길이를 입력해야 합니다.</p>}

          {errorFromSubmit && <p>에러가 발생했습니다.</p>}
          <Button type="primary" onClick={handleSubmit(onSubmit)}>로그인</Button>
          <input type="submit" style={{ display: 'none' }} />
          <Link href="/register">
            <a>아직 아이디가 없다면...</a>
          </Link>
        </form>
      </div>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookies = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookies) {
    axios.defaults.headers.Cookie = cookies;
  }
  context.store.dispatch(loadUserAction());
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Login;
