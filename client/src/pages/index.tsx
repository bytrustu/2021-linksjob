import Link from 'next/link';
import Layout from '../components/Layout';
import React from 'react';
import { useDispatch } from 'react-redux';
import { LOAD_MAIN_COMPANY_POSTS_REQUEST } from '../redux/types';

const IndexPage = () => {
  const dispatch = useDispatch();
  dispatch({
    type: LOAD_MAIN_COMPANY_POSTS_REQUEST,
  });
  return (
    <>
      content
    </>
  );

};
export default IndexPage;