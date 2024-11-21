import React from 'react';
import { Outlet } from 'react-router-dom';
import './Main.css';
import FeatureMenu from '../../components/FeatureMenu/FeatureMenu';

function Main() {
  return (
    <div className="container-fluid g-0">
      <div className="row g-0" style={{ height: '100vh' }}> 
        {/* 選單區域 */}
        <div className="col-lg-2 d-none d-lg-block FeatureMenu">
          <FeatureMenu />
        </div>
        <div className="col-12 d-lg-none">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <FeatureMenu />
            </div>
          </nav>
        </div>

        {/* 內容區域 */}
        <div className="content-container col-lg-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Main;
