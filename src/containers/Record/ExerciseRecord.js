import React, { useState } from 'react';
import './ExerciseRecord.css';
import { submitExerciseRecord } from '../../services/api/userApi';  // API 請求

function ExerciseRecord() {
  const [exerciseData, setExerciseData] = useState({
    exe_date: '',
    exe_type: '',
    calories: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExerciseData({
      ...exerciseData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await submitExerciseRecord(exerciseData); // API 提交數據
      if (response.status === 'success') {
        alert('運動紀錄成功提交！');
        setExerciseData({ exe_date: '', exe_type: '', calories: '' });
      }
    } catch (error) {
      console.error('提交運動紀錄失敗', error);
    }
  };

  return (
    <div className="ExerciseRecord">
      <h1>運動紀錄輸入</h1>
      <form onSubmit={handleSubmit} className="record-form">
        <div className="form-item">
          <label>紀錄日期:</label>
          <input
            type="date"
            name="exe_date"
            value={exerciseData.exe_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-item">
          <label>運動類型:</label>
          <input
            type="text"
            name="exe_type"
            value={exerciseData.exe_type}
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
            value={exerciseData.calories}
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
  );
}

export default ExerciseRecord;
