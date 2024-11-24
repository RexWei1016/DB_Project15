import React, { useState, useEffect } from 'react';
import './ExerciseRecord.css';
import { submitExerciseRecord, getExerciseHistory } from '../../services/api/recordApi';  // API 請求

function ExerciseRecord() {
  const [exerciseData, setExerciseData] = useState({
    exe_date: '',
    id: '',
    exe_time: '',
    exe_type: '',
    calories: '',
  });
  const [exerciseHistory, setExerciseHistory] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState({ date: '', time: '' });

  useEffect(() => {
    const userID = localStorage.getItem('userID');
    if (userID) {
      const today = new Date();
      const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
      setExerciseData((prevData) => ({ ...prevData, id: userID, exe_date: formattedDate }));
      fetchExerciseHistory(userID);
    } else {
      alert('用戶未登入，請重新登入');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExerciseData({
      ...exerciseData,
      [name]: value || '', // 確保不會設置為 undefined
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await submitExerciseRecord(exerciseData); // API 提交數據
      if (response.message) {
        alert(response.message);
        setExerciseData((prevData) => ({
          ...prevData,
          exe_time: '',
          exe_type: '',
          calories: '',
        }));
        fetchExerciseHistory(exerciseData.id); // 刷新歷史紀錄
      }
    } catch (error) {
      console.error('提交運動紀錄失敗', error);
      alert(`提交失敗: ${error.message}`);
    }
  };

  const fetchExerciseHistory = async (userID) => {
    try {
      const response = await getExerciseHistory(userID);
      if (response && response.data && response.data.length > 0) {
        setExerciseHistory(response.data);
        const latestRecord = response.data[0];
        setSelectedDateTime({ date: latestRecord.exe_date, time: latestRecord.exe_time });
        setExerciseData((prevData) => ({
          ...prevData,
          exe_date: latestRecord.exe_date || '',
          exe_time: latestRecord.exe_time || '',
          exe_type: latestRecord.exe_type || '',
          calories: latestRecord.calories || '',
        }));
      } else {
        setExerciseHistory([]);
        console.error('No exercise history data received');
      }
    } catch (error) {
      console.error('Failed to fetch exercise history data', error);
    }
  };

  const handleDateSelection = (date, time) => {
    setSelectedDateTime({ date, time });
    const selectedData = exerciseHistory.find((record) => record.exe_date === date && record.exe_time === time);
    if (selectedData) {
      setExerciseData((prevData) => ({
        ...prevData,
        exe_date: selectedData.exe_date || '',
        id: selectedData.id || exerciseData.id, // 確保 ID 正確設置
        exe_time: selectedData.exe_time || '',
        exe_type: selectedData.exercise_type || '',
        calories: selectedData.calories || '',
      }));
    } else {
      console.warn('No matching record found for the selected date and time');
    }
  };

  return (
    <div className="ExerciseRecord">
      <h1>運動紀錄</h1>
      <div className="main-container">
        <div className="left-panel">
          <h3>選擇紀錄日期</h3>
          <ul className="date-list">
            {exerciseHistory.map((record) => (
              <li
                key={`${record.exe_date}-${record.exe_time}`}
                className={`date-item ${record.exe_date === selectedDateTime.date && record.exe_time === selectedDateTime.time ? 'selected' : ''}`}
                onClick={() => handleDateSelection(record.exe_date, record.exe_time)}
              >
                {record.exe_date} {record.exe_time}
              </li>
            ))}
          </ul>
        </div>
        <div className="right-panel">
          <form onSubmit={handleSubmit} className="record-form">
            <div className="form-item" style={{ display: 'none' }}>
              <label>用戶ID:</label>
              <input type="text" name="id" value={exerciseData.id || ''} readOnly />
            </div>
            <div className="form-item">
              <label>紀錄日期:</label>
              <input type="date" name="exe_date" value={exerciseData.exe_date || ''} onChange={handleChange} required />
            </div>
            <div className="form-item">
              <label>運動時間:</label>
              <input
                type="time"
                name="exe_time"
                value={exerciseData.exe_time || ''}
                onChange={handleChange}
                placeholder="HH:MM:SS"
                required
              />
            </div>
            <div className="form-item">
              <label>運動類型:</label>
              <input
                type="text"
                name="exe_type"
                value={exerciseData.exe_type || ''}
                onChange={handleChange}
                placeholder="例如：跑步、游泳"
                required
              />
            </div>
            <div className="form-item">
              <label>消耗卡路里:</label>
              <input
                type="number"
                name="calories"
                value={exerciseData.calories || ''}
                onChange={handleChange}
                placeholder="消耗的卡路里數"
                required
              />
            </div>
            <button type="submit" className="ExerciseRecord-button">
              提交紀錄
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ExerciseRecord;
