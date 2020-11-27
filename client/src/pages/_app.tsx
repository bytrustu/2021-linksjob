import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import wrapper from '../store/configureStore';
import AppLayout from '../components/Layout/AppLayout';
import '../asset/scss/reset.scss';
import '../asset/scss/layout.scss';
import '../asset/scss/common.scss';
import { useSelector } from 'react-redux';


const MyApp = ({ Component, pageProps }: AppProps) => {
  const { isAuthenticated } = useSelector(state => state.user);
  useEffect(() => {
    console.log(isAuthenticated, `>>>>>>>>>`);
  }, [isAuthenticated])
  return (
    <>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
};
export default wrapper.withRedux(MyApp);