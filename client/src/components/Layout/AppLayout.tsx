import React, { FC, ReactElement } from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import Loading from 'src/components/Loading';

interface Props {
  children: ReactElement;
}

const AppLayout: FC<Props> = ({ children }) => (
  <div className="main">
    <Loading status={false}/>
    <Header />
    <Content children={children}/>
    <Footer />
  </div>
);

export default AppLayout;
