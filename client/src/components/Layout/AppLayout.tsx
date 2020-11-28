import React, { FC, ReactElement, useEffect } from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import Loading from '../Loading';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/reducers';

interface Props {
  children: ReactElement;
}

const AppLayout: FC<Props> = ({ children }) => {
  const { loginUserLoading, userLoading } = useSelector((state: RootState) => state.user);
  const { companySearchLoading } = useSelector((state: RootState) => state.company);
  return (
    <>
      <div className={`main ${(loginUserLoading || userLoading || companySearchLoading) ? 'overflow-hidden' : ''}`}>
        <Loading />
        <Header />
        <Content children={children} />
        <Footer />
      </div>
    </>
  )
    ;
};

export default AppLayout;
