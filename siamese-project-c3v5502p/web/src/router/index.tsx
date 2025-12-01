import React from 'react';
import { Route, Routes, HashRouter } from 'react-router-dom';
import Home from '../pages/Home/index';

// 路由系统基于`react-router-dom`V6版本实现
const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        {/* 广之优茶几工厂宣传网站首页 */}
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
