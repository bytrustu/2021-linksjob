import React, { FC, ReactElement, useState } from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import Loading from '../Loading';
import { useSelector } from 'react-redux';

interface Props {
  children: ReactElement;
}

const AppLayout: FC<Props> = ({ children }) => {

  const [visible, setVisible] = useState(true);
  const hideModal = () => {
    setVisible(false);
  };

  const { loginUserLoading } = useSelector(state => state.user);

  return <div className="main">
    <Loading status={loginUserLoading} />
    <Header />
    <Content children={children} />
    <Footer />
  </div>;
};

export default AppLayout;
