import React, { FC, ReactElement } from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

interface Props {
  children: ReactElement;
}

const AppLayout: FC<Props> = ({ children }) => (
  <div className="main">
    <Header />
    <Content children={children}/>
    <Header />
    <Footer />
  </div>
);

export default AppLayout;
