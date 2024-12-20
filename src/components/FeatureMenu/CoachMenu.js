import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FeatureMenu.css';

function CoachMenu() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="FeatureMenu">
      <h1>教練功能選單</h1>
      <ul className="menu-list">
        <li onClick={() => handleNavigation('/CoachMain/')}>
          會員日常監測
        </li>
        <li onClick={() => handleNavigation('/CoachMain/exercise-record')}>
          會員運動紀錄
        </li>
        <li onClick={() => handleNavigation('/CoachMain/food-record')}>
          會員飲食紀錄
        </li>
        <li onClick={() => handleNavigation('/CoachMain/consultation')}>
          會員諮詢紀錄
        </li>
      </ul>
      <button className="logout-button" onClick={handleLogout}>
        登出
      </button>
    </div>
  );
}

export default CoachMenu;
