import React, { useState } from 'react';
import { Layout, Breadcrumb, Row } from 'antd';

import './style/global.scss';
import Funcionario from './components/Funcionario';

const { Header, Content, Footer } = Layout;

export default function App() {

  return (
    <Layout className="layout">
      <Header className="header" style={{ zIndex: 1, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Row>
          <div className="logo" />
        </Row>
        <Row className="title">
          <h2>Registrar Funcionario</h2><h2>Tabelas e Cálculos do IRRF</h2>
        </Row>
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Funcionários</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
          <Funcionario />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
}
