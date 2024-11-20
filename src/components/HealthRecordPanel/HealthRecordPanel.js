import React, { useState, useEffect } from 'react';
import './HealthRecordPanel.css';
import { getDailyMonitorData, submitDailyMonitorData } from '../../services/api/monitorApi'; // API取得與寫入每日監控數據

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
      const userID = localStorage.getItem('userID'); // 從 localStorage 獲取用戶 ID
      if (!userID) {
        alert('用戶未登入，請重新登入');
        return;
      }

      try {
        const data = await getDailyMonitorData(userID); // 使用 API 獲取數據
        setMonitorData(data);
      } catch (error) {
        console.error('Failed to fetch daily monitor data', error);
      }
    };

    fetchData();
  }, []);

  const generateRandomData = () => {
    const randomWeight = (50 + Math.random() * 30).toFixed(1);
    const randomHeight = (150 + Math.random() * 30).toFixed(1);
    const randomBP = `${Math.floor(90 + Math.random() * 40)}/${Math.floor(60 + Math.random() * 30)}`;
    const randomSleepDuration = (4 + Math.random() * 4).toFixed(1);
    const sleepQualityOptions = ['良好', '一般', '差'];
    const randomSleepQuality = sleepQualityOptions[Math.floor(Math.random() * sleepQualityOptions.length)];

    return {
      m_date: new Date().toISOString().split('T')[0],
      weight: randomWeight,
      height: randomHeight,
      b_pressure: randomBP,
      sleep_duration: randomSleepDuration,
      sleep_quality: randomSleepQuality,
    };
  };

  const handleMeasure = async () => {
    const userID = localStorage.getItem('userID'); // 確保從 localStorage 取到 ID
    if (!userID) {
      alert('用戶未登入，請重新登入');
      return;
    }

    const simulatedData = generateRandomData();
    setMonitorData(simulatedData);

    const payload = {
      m_date: simulatedData.m_date,
      id: userID, // 使用 localStorage 中的 ID
      weight: simulatedData.weight,
      height: simulatedData.height,
      b_pressure: simulatedData.b_pressure,
      sleep_dt: new Date().toISOString(),
      sleep_duration: simulatedData.sleep_duration,
      sleep_quality: simulatedData.sleep_quality,
    };

    try {
      const response = await submitDailyMonitorData(payload);
      console.log('Daily Monitor Data Submitted:', response);
      alert('量測數據已成功寫入');
    } catch (error) {
      console.error('Error submitting daily monitor data:', error.message);
      alert('量測數據寫入失敗，請稍後再試');
    }
  };

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
      <button className="measure-button" onClick={handleMeasure}>
        量測
      </button>
    </div>
  );
}

export default HealthRecordPanel;
