import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_USER_REQUEST } from '../../redux/types';
import Loading from 'src/components/Loading';

const Login = () => {

  const { register, errors, handleSubmit } = useForm();
  const [errorFromSubmit, setErrorFromSubmit] = useState('');

  const dispatch = useDispatch();

  const onSubmit = (data: any) => {
    try {
      console.log(data);
      dispatch({ type: LOGIN_USER_REQUEST });
    } catch (e) {
      setIsLoading(false);
      setErrorFromSubmit(e.message);
      alert('인증에 실패 했습니다.');
    }
  };

  return (
    <>
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
          {errors.password && errors.password.type === 'minLength' && <p>비밀번호는 최소 4자리 길이를 입력해야 합니다.</p>}

          {errorFromSubmit && <p>에러가 발생했습니다.</p>}
          <Button type="primary" onClick={handleSubmit(onSubmit)}>로그인</Button>
          <Link href="/register">
            <a>아직 아이디가 없다면...</a>
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;