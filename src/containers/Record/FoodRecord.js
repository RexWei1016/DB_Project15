import React, { useState } from 'react';
import './FoodRecord.css';
import { submitFoodRecord } from '../../services/api/recordApi';  // API 請求

function FoodRecord() {
  const [foodData, setFoodData] = useState({
    eat_date: '',
    fid: '',
    food_num: '',
    calories: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodData({
      ...foodData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await submitFoodRecord(foodData); // API 提交數據
      if (response.status === 'success') {
        alert('飲食紀錄成功提交！');
        setFoodData({ eat_date: '', fid: '', food_num: '', calories: '' });
      }
    } catch (error) {
      console.error('提交飲食紀錄失敗', error);
    }
  };

  return (
    <div className="FoodRecord">
      <h1>飲食紀錄輸入</h1>
      <form onSubmit={handleSubmit} className="record-form">
        <div className="form-item">
          <label>紀錄日期:</label>
          <input
            type="date"
            name="eat_date"
            value={foodData.eat_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-item">
          <label>食物:</label>
          <input
            type="text"
            name="fid"
            value={foodData.fid}
            onChange={handleChange}
            placeholder="食物名稱或ID"
            required
          />
        </div>
        <div className="form-item">
          <label>食物數量:</label>
          <input
            type="number"
            name="food_num"
            value={foodData.food_num}
            onChange={handleChange}
            placeholder="食物的數量"
            required
          />
        </div>
        <div className="form-item">
          <label>消耗卡路里:</label>
          <input
            type="number"
            name="calories"
            value={foodData.calories}
            onChange={handleChange}
            placeholder="消耗的卡路里數"
            required
          />
        </div>
        <button type="submit" className="FoodRecord-button">
          提交紀錄
        </button>
      </form>
    </div>
  );
}

export default FoodRecord;
