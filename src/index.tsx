import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ToastContainer } from 'react-toastify';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR';
import 'antd/dist/antd.css'

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={ptBR}>
      <App />
      <ToastContainer autoClose={3000} />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

