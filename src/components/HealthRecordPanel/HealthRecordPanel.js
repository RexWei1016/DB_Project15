import React, { useState, useEffect } from 'react';
import './HealthRecordPanel.css';
import { getDailyMonitorData, deleteDailyMonitorData, submitDailyMonitorData } from '../../services/api/monitorApi'; // API取得與寫入每日監控數據

function HealthRecordPanel() {
  const [monitorDataList, setMonitorDataList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(''); // 儲存使用者選擇的日期
  const [monitorData, setMonitorData] = useState({
    m_date: '',
    weight: '',
    height: '',
    b_pressure: '',
    sleep_duration: '',
    sleep_quality: '',
  });

  const [measurementDate, setMeasurementDate] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
  });

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch daily monitor data
  const fetchData = async () => {
    const userID = localStorage.getItem('userID');
    if (!userID) {
      alert('用戶未登入，請重新登入');
      return;
    }

    try {
      const response = await getDailyMonitorData(userID);
      if (response.data && response.data.length > 0) {
        setMonitorDataList(response.data);
        setSelectedDate(response.data[0].m_date);
      } else {
        console.error('No data received');
      }
    } catch (error) {
      console.error('Failed to fetch daily monitor data', error);
    }
  };

  // Handle date selection from left-side list
  const handleDateSelection = (date) => {
    setSelectedDate(date);
  };

  // Update monitorData when selectedDate changes
  useEffect(() => {
    if (selectedDate) {
      const selectedData = monitorDataList.find((item) => item.m_date === selectedDate);
      if (selectedData) {
        setMonitorData(selectedData);
      }
    }
  }, [selectedDate, monitorDataList]);

  const generateRandomData = () => {
    const randomWeight = (50 + Math.random() * 30).toFixed(1);
    const randomHeight = (150 + Math.random() * 30).toFixed(1);
    const randomBP = `${Math.floor(90 + Math.random() * 40)}/${Math.floor(60 + Math.random() * 30)}`;
    const randomSleepDuration = (6 + Math.random() * 4).toFixed(1); // 隨機生成 6 到 10 小時之間的睡眠
    const sleepQualityOptions = ['良好', '一般', '差'];
    const randomSleepQuality = sleepQualityOptions[Math.floor(Math.random() * sleepQualityOptions.length)];

    return {
      m_date: measurementDate,
      weight: randomWeight,
      height: randomHeight,
      b_pressure: randomBP,
      sleep_duration: `${randomSleepDuration} hours`,
      sleep_quality: randomSleepQuality,
    };
  };

  const handleMeasurementDateChange = (event) => {
    setMeasurementDate(event.target.value);
  };

  const handleMeasure = async () => {
    const userID = localStorage.getItem('userID');
    if (!userID) {
      alert('用戶未登入，請重新登入');
      return;
    }

    // 生成新的隨機量測數據
    const simulatedData = generateRandomData();
    setMonitorData(simulatedData);

    const payload = {
      m_date: measurementDate,
      id: userID,
      weight: simulatedData.weight,
      height: simulatedData.height,
      b_pressure: simulatedData.b_pressure,
      sleep_dt: measurementDate,
      sleep_duration: simulatedData.sleep_duration,
      sleep_quality: simulatedData.sleep_quality,
    };

    try {
      // 刪除當日數據，保證不重複
      await deleteDailyMonitorData(userID, measurementDate);
      console.log('Daily monitor data deleted successfully for:', userID, measurementDate);

      // 提交新數據
      const response = await submitDailyMonitorData(payload);
      console.log('Daily Monitor Data Submitted:', response);
      alert('量測數據已成功寫入');

      // 刷新資料以顯示新記錄
      fetchData();
    } catch (error) {
      console.error('Error during the measure process:', error.message);
      alert('量測數據寫入失敗，請稍後再試');
    }
  };

  return (
    <div className="HealthRecordPanel">
      <h1>身體紀錄面板</h1>

      <div className="main-container">
        {/* 左側清單：顯示所有可選日期 */}
        <div className="left-panel">
          <h3>選擇紀錄日期</h3>
          <ul className="date-list">
            {monitorDataList.map((data) => (
              <li
                key={data.m_date}
                className={`date-item ${data.m_date === selectedDate ? 'selected' : ''}`}
                onClick={() => handleDateSelection(data.m_date)}
              >
                {data.m_date}
              </li>
            ))}
          </ul>
        </div>

        {/* 右側顯示選擇的日期數據 */}
        <div className="right-panel">
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
              <span>{monitorData.sleep_duration}</span>
            </div>
            <div className="record-item">
              <label>睡眠品質: </label>
              <span>{monitorData.sleep_quality}</span>
            </div>
          </div>

          <div className="measure-container">
            <label htmlFor="measurementDate">量測日期: </label>
            <input
              type="date"
              id="measurementDate"
              value={measurementDate}
              onChange={handleMeasurementDateChange}
            />
            <button className="measure-button" onClick={handleMeasure}>
              量測
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HealthRecordPanel;
