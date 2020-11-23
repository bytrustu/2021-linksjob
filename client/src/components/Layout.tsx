import React, { FC, ReactElement } from 'react';
import Link from 'next/link';
import Head from 'next/head';
// @ts-ignore
import { Layout, Menu, Breadcrumb } from 'antd';
import Footer from '../components/Layout/Footer';

// @ts-ignore
const { Header, Content } = Layout;

interface Props {
  children: ReactElement;
}

const AppLayout: FC<Props> = ({ children }) => (
  <Layout className="layout" style={{ backgroundColor: 'white'}}>
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-content">
        Content
        {children}
      </div>
    </Content>
    <Footer/>
  </Layout>
)

export default AppLayout;
