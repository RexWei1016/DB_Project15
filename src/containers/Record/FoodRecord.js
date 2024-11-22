import React, { useState, useEffect } from 'react';
import './FoodRecord.css';
import { submitFoodRecord } from '../../services/api/recordApi'; // API 請求
import { submitFood, getAllFoods } from '../../services/api/foodApi'; // 食物相關API

function FoodRecord() {
  const [foodData, setFoodData] = useState({
    eat_date: '',
    fid: '',
    food_num: '',
    calories: '',
    unit_calories: '', // 新增一個屬性來保存單位卡路里
  });

  const [newFoodData, setNewFoodData] = useState({
    food_type: '',
    food_calories: '',
  });

  const [foodList, setFoodList] = useState([]);
  const [isAddingFood, setIsAddingFood] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); // 新增成功訊息的狀態

  // 初始化查詢食物列表
  useEffect(() => {
    fetchFoodList();
  }, []);

  const fetchFoodList = async () => {
    try {
      const response = await getAllFoods(); // 查詢所有食物
      setFoodList(response.data || []);
    } catch (error) {
      console.error('獲取食物列表失敗:', error);
    }
  };

  const handleFoodRecordChange = (e) => {
    const { name, value } = e.target;
    const updatedFoodData = {
      ...foodData,
      [name]: value,
    };

    // 當選擇食物時，保存單位卡路里並計算總卡路里（如果數量已存在）
    if (name === 'fid') {
      const selectedFood = foodList.find((food) => food.fid === parseInt(value, 10)); // 確保 fid 類型匹配
      if (selectedFood) {
        updatedFoodData.unit_calories = selectedFood.food_calories;
        if (updatedFoodData.food_num) {
          updatedFoodData.calories = (selectedFood.food_calories * updatedFoodData.food_num).toFixed(2);
        }
      } else {
        updatedFoodData.unit_calories = '';
        updatedFoodData.calories = '';
      }
    }

    // 當食物數量更改時，根據單位卡路里計算總卡路里
    if (name === 'food_num') {
      if (foodData.unit_calories && value) {
        updatedFoodData.calories = (foodData.unit_calories * value).toFixed(2);
      } else {
        updatedFoodData.calories = '';
      }
    }

    setFoodData(updatedFoodData);
  };

  const handleNewFoodChange = (e) => {
    const { name, value } = e.target;
    setNewFoodData({
      ...newFoodData,
      [name]: value,
    });
  };

  const handleFoodRecordSubmit = async (e) => {
    e.preventDefault();
    // 提交時重新計算卡路里，確保值是正確的
    const selectedFood = foodList.find((food) => food.fid === parseInt(foodData.fid, 10));
    if (selectedFood && foodData.food_num) {
      foodData.calories = parseInt((selectedFood.food_calories * foodData.food_num).toFixed(2), 10);
    }
    try {
      const payload = {
        eat_date: foodData.eat_date, // 時間戳為完整日期與時間
        id: localStorage.getItem('userID'), // 假設用戶 ID 存在 localStorage 中
        fid: parseInt(foodData.fid, 10),
        food_num: parseInt(foodData.food_num, 10),
        calories: parseInt(foodData.calories, 10),
      };
      const response = await submitFoodRecord(payload); // API 提交飲食紀錄
      if (response.ok) {
        setSuccessMessage('飲食紀錄成功提交！');
        setFoodData({ eat_date: '', fid: '', food_num: '', calories: '', unit_calories: '' });

        // 清除訊息顯示 3 秒後消失
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      console.error('提交飲食紀錄失敗', error);
    }
  };

  const handleNewFoodSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await submitFood(newFoodData); // API 提交新增食物
      console.log(response)
      alert(response.message || '食物新增成功');
      setNewFoodData({ food_type: '', food_calories: '' });
      setIsAddingFood(false);
      fetchFoodList(); // 更新食物列表
    } catch (error) {
      console.error('新增食物失敗:', error);
    }
  };

  return (
    <div className="FoodRecord">
      <h1>飲食紀錄輸入</h1>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <form onSubmit={handleFoodRecordSubmit} className="record-form">
        <div className="form-item">
          <label>紀錄日期與時間:</label>
          <input
            type="datetime-local"
            name="eat_date"
            value={foodData.eat_date}
            onChange={handleFoodRecordChange}
            required
          />
        </div>
        <div className="form-item">
          <label>食物:</label>
          <select
            name="fid"
            value={foodData.fid}
            onChange={handleFoodRecordChange}
            required
          >
            <option value="">請選擇食物</option>
            {foodList.map((food) => (
              <option key={food.fid} value={food.fid}>
                {food.food_type} ({food.food_calories} kcal)
              </option>
            ))}
          </select>
        </div>
        <div className="form-item">
          <label>食物數量:</label>
          <input
            type="number"
            name="food_num"
            value={foodData.food_num}
            onChange={handleFoodRecordChange}
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
            readOnly
          />
        </div>
        <button type="submit" className="FoodRecord-button">
          提交紀錄
        </button>
      </form>

      <h2>新增食物</h2>
      {!isAddingFood ? (
        <button onClick={() => setIsAddingFood(true)} className="FoodRecord-button">
          新增食物
        </button>
      ) : (
        <form onSubmit={handleNewFoodSubmit} className="record-form">
          <div className="form-item">
            <label>食物名稱:</label>
            <input
              type="text"
              name="food_type"
              value={newFoodData.food_type}
              onChange={handleNewFoodChange}
              placeholder="食物名稱"
              required
            />
          </div>
          <div className="form-item">
            <label>卡路里 (每100克):</label>
            <input
              type="number"
              name="food_calories"
              value={newFoodData.food_calories}
              onChange={handleNewFoodChange}
              placeholder="卡路里數"
              required
            />
          </div>
          <button type="submit" className="FoodRecord-button">
            提交新增
          </button>
          <button
            type="button"
            onClick={() => setIsAddingFood(false)}
            className="FoodRecord-button cancel-button"
          >
            取消
          </button>
        </form>
      )}
    </div>
  );
}

export default FoodRecord;
