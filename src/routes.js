import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './containers/Login/Login'; // 登錄頁面
import HealthRecordPanel from './components/HealthRecordPanel/HealthRecordPanel';
import Main from './containers/Main/Main'; // 主佈局頁面
import ExerciseRecord from './containers/Record/ExerciseRecord';
import FoodRecord from './containers/Record/FoodRecord';
import Consultation from './containers/Record/Consultation';
import DefaultPage from './containers/Main/DefaultPage';
import Register from './containers/Login/Register';
import CoachRegister from './containers/Login/CoachRegister';
import CoachMain from './containers/Main/CoachMain';
import CoachHealthRecordPanel from './components/HealthRecordPanel/CoachHealthRecordPanel';
import CoachExerciseRecordPanel from './containers/Record/Coach_ExerciseRecordPanel';
import FoodRecordPanel from './containers/Record/Coach_FoodRecordPanel';

function AppRoutes() {
  return (
    <Routes>
      {/* 登錄頁面路由 */}
      <Route path="/" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/CoachRegister" element={<CoachRegister />} />

      {/* CoachMain 是包含選單的主佈局，其他功能頁面是其子路由 */}
      <Route path="/CoachMain" element={<CoachMain />}>
        <Route index element={<CoachHealthRecordPanel />} />  {/* 預設頁面 */}
        <Route path="exercise-record" element={<CoachExerciseRecordPanel />} />
        <Route path="food-record" element={<FoodRecordPanel />} />
        <Route path="consultation" element={<Consultation />} />
      </Route>
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
