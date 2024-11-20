import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // 引入 Bootstrap JavaScript 依賴

const root = ReactDOM.createRoot(document.getElementById('root'));

// 使用 process.env.PUBLIC_URL 作為 basename
root.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>
);
