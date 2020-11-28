import React, { FC, ReactElement } from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import Loading from '../Loading';

interface Props {
  children: ReactElement;
}

const AppLayout: FC<Props> = ({ children }) => {

  return (
    <div className="main">
      <Loading />
      <Header />
      <Content children={children} />
      <Footer />
    </div>)
    ;
};

export default AppLayout;
