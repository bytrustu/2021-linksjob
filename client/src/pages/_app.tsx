import React from 'react';
import { AppProps } from 'next/app';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import wrapper from '../store/configureStore';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Component {...pageProps} />
  </>
);

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
};
export default wrapper.withRedux(MyApp);