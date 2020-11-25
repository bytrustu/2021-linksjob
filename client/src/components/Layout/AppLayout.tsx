import React, { FC, ReactElement, useState } from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import Loading from 'src/components/Loading';
import { Modal } from 'antd';
import ConfirmModal from '../Modal/ConfirmModal';
import CompanyModal from '../Modal/CompanyModal';

interface Props {
  children: ReactElement;
}

const AppLayout: FC<Props> = ({ children }) => {

  const [visible, setVisible] = useState(true);
  const hideModal = () => {
    setVisible(false);
  };

  return <div className="main">
    <CompanyModal />
    <Loading status={false} />
    <Header />
    <Content children={children} />
    <Footer />
  </div>;
};

export default AppLayout;
