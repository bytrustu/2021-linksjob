import React, { FC, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { REGISTER_USER_REQUEST } from '../../redux/types';
import wrapper from '../../store/configureStore';
import axios from 'axios';
import { loadUserAction } from '../../redux/reducers/userReducer';
import { END } from 'redux-saga';
import Router from 'next/router';
import AlertModal from '../../components/Modal/AlertModal';
import { RootState } from '../../redux/reducers';

const Register: FC = () => {

  const dispatch = useDispatch();
  const { isAuthenticated, userErrorMsg } = useSelector((state: RootState) => state.user);
  const { register, watch, errors, handleSubmit } = useForm();
  const password = useRef();
  password.current = watch('password');
  const [errorFromSubmit, setErrorFromSubmit] = useState<string>('');
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);

  const onSubmit = async (data: { email: string; password: string }) => {
    const { email, password } = data;
    try {
      dispatch({
        type: REGISTER_USER_REQUEST,
        data: { email, password },
      });
    } catch (e) {
      setErrorFromSubmit(e.message);
      setTimeout(() => {
        setErrorFromSubmit('');
      }, 3000);
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
          <h3>회원 가입</h3>
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
            ref={register({
              required: true,
              pattern: /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{6,50}$/,
            })}
          />
          {errors.password && errors.password.type === 'required' && <p>비밀번호는 필수 입력값 입니다.</p>}
          {errors.password && errors.password.type === 'pattern' && <p>비밀번호는 영문, 숫자, 특수문자 포함 6자 이상 입니다.</p>}

          <label>비밀번호 확인</label>
          <input
            name="password_confirm"
            type="password"
            ref={register({
              required: true,
              validate: value => value === password.current,
            })}
          />
          {errors.password_confirm && errors.password_confirm.type === 'required' && <p>비밀번호는 필수 입력값 입니다.</p>}
          {errors.password_confirm && errors.password_confirm.type === 'validate' && <p>비밀번호가 동일하지 않습니다.</p>}

          {errorFromSubmit && <p>에러가 발생했습니다.</p>}
          <Button type="primary" onClick={handleSubmit(onSubmit)}>회원가입</Button>
          <input type="submit" style={{ display: 'none' }} />
          <Link href="/login">
            <a>이미 아이디가 있다면...</a>
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

export default Register;