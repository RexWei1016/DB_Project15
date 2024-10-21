import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './containers/Login/Login'; // 登錄頁面
import HealthRecordPanel from './components/HealthRecordPanel/HealthRecordPanel';
import Main from './containers/Main/Main'; // 主佈局頁面
import ExerciseRecord from './containers/Record/ExerciseRecord';
import FoodRecord from './containers/Record/FoodRecord';
import Consultation from './containers/Record/Consultation';
import DefaultPage from './containers/Main/DefaultPage';

function AppRoutes() {
  return (
    <Routes>
      {/* 登錄頁面路由 */}
      <Route path="/" element={<Login />} />

      {/* Main 是包含選單的主佈局，其他功能頁面是其子路由 */}
      <Route path="/Main" element={<Main />}>
        <Route index element={<HealthRecordPanel />} />  {/* 預設頁面 */}
        <Route path="exercise-record" element={<ExerciseRecord />} />
        <Route path="food-record" element={<FoodRecord />} />
        <Route path="consultation" element={<Consultation />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
