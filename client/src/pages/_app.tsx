import React from 'react';
import { AppProps } from 'next/app';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import wrapper from '../store/configureStore';
import AppLayout from '../components/Layout/AppLayout';
import '../asset/scss/reset.scss';
import '../asset/scss/layout.scss';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  </>
);

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
};
export default wrapper.withRedux(MyApp);