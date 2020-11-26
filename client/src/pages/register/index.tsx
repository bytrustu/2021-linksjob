import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserAction } from 'src/redux/reducers/userReducer';
import { REGISTER_USER_REQUEST } from 'src/redux/types';

const Register = () => {

  const dispatch = useDispatch();
  const { register, watch, errors, handleSubmit } = useForm();
  const password = useRef();
  password.current = watch('password');
  const [errorFromSubmit, setErrorFromSubmit] = useState('');

  const onSubmit = async (data: { email: string; password: string; }) => {
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

  return (
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
          ref={register({ required: true, minLength: 4 })}
        />
        {errors.password && errors.password.type === 'required' && <p>비밀번호는 필수 입력값 입니다.</p>}
        {errors.password && errors.password.type === 'minLength' && <p>비밀번호는 최소 4자리 길이를 입력해야 합니다.</p>}

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
        <Link href="/login">
          <a>이미 아이디가 있다면...</a>
        </Link>
      </form>
    </div>
  );
};

export default Register;