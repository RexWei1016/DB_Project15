import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FeatureMenu.css';

function FeatureMenu() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="FeatureMenu">
      <h1>功能選單</h1>
      <ul className="menu-list">
        <li onClick={() => handleNavigation('/Main/')}>
          身體記錄量測
        </li>
        <li onClick={() => handleNavigation('/Main/exercise-record')}>
          運動記錄輸入
        </li>
        <li onClick={() => handleNavigation('/Main/food-record')}>
          飲食記錄輸入
        </li>
        <li onClick={() => handleNavigation('/Main/consultation')}>
          諮詢健康教練
        </li>
      </ul>
      <button className="logout-button" onClick={handleLogout}>
        登出
      </button>
    </div>
  );
}

export default FeatureMenu;
