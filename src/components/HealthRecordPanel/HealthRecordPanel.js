import React, { useState, useEffect } from 'react';
import './HealthRecordPanel.css';
import { getDailyMonitorData } from '../../services/api/userApi';  // 從API取得每日監控數據

function HealthRecordPanel() {
  const [monitorData, setMonitorData] = useState({
    m_date: '',
    weight: '',
    height: '',
    b_pressure: '',
    sleep_duration: '',
    sleep_quality: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDailyMonitorData();  // API獲取數據
        setMonitorData(data);
      } catch (error) {
        console.error('Failed to fetch daily monitor data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="HealthRecordPanel">
      <h1>身體紀錄面板</h1>
      <div className="record-container">
        <div className="record-item">
          <label>紀錄日期: </label>
          <span>{monitorData.m_date}</span>
        </div>
        <div className="record-item">
          <label>體重: </label>
          <span>{monitorData.weight} kg</span>
        </div>
        <div className="record-item">
          <label>身高: </label>
          <span>{monitorData.height} cm</span>
        </div>
        <div className="record-item">
          <label>血壓: </label>
          <span>{monitorData.b_pressure} mmHg</span>
        </div>
        <div className="record-item">
          <label>睡眠時長: </label>
          <span>{monitorData.sleep_duration} 小時</span>
        </div>
        <div className="record-item">
          <label>睡眠品質: </label>
          <span>{monitorData.sleep_quality}</span>
        </div>
      </div>
    </div>
  );
}

export default HealthRecordPanel;
