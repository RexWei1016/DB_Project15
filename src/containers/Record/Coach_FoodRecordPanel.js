import React, { useState, useEffect } from 'react';
import styles from './Coach_FoodRecordPanel.module.css'; // 使用 CSS Modules
import { getFoodRecord } from '../../services/api/recordApi'; // API 請求
import { getAllFoods } from '../../services/api/foodApi'; // 食物相關API
import { fetchAllUsers } from '../../services/api/userApi'; // API: 獲取使用者清單

function FoodRecordPanel() {
  const [foodList, setFoodList] = useState([]);
  const [foodRecords, setFoodRecords] = useState([]);
  const [userList, setUserList] = useState([]); // 使用者清單
  const [selectedUserID, setSelectedUserID] = useState('');

  // 初始化查詢食物列表和使用者清單
  useEffect(() => {
    fetchFoodList();
    fetchUsers();
  }, []);

  const fetchFoodList = async () => {
    try {
      const response = await getAllFoods(); // 查詢所有食物
      setFoodList(response.data || []);
    } catch (error) {
      console.error('獲取食物列表失敗:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetchAllUsers();
      if (response.users) {
        setUserList(response.users);
      }
    } catch (error) {
      console.error('獲取使用者清單失敗:', error);
    }
  };

  const fetchFoodRecords = async (userID) => {
    try {
      const response = await getFoodRecord(userID); // API 查詢飲食紀錄
      setFoodRecords(response.data || []);
    } catch (error) {
      console.error('查詢飲食紀錄失敗:', error);
    }
  };

  const handleUserSelection = (userID) => {
    setSelectedUserID(userID);
    fetchFoodRecords(userID); // 查詢該用戶的飲食紀錄
  };

  return (
    <div className={styles.FoodRecordPanel}>
      <h1>飲食紀錄管理</h1>

      <div className={styles['main-container']}>
        {/* 左側使用者選擇 */}
        <div className={styles['left-panel']}>
          <h3>選擇使用者</h3>
          <ul className={styles['user-list']}>
            {userList.map((user) => (
              <li
                key={user.ID}
                className={`${styles['user-item']} ${user.ID === selectedUserID ? styles.selected : ''}`}
                onClick={() => handleUserSelection(user.ID)}
              >
                {user.name} ({user.ID})
              </li>
            ))}
          </ul>
        </div>

        {/* 中間紀錄顯示 */}
        <div className={styles['middle-panel']}>
          <h3>飲食紀錄</h3>
          <ul className={styles['record-list']}>
            {foodRecords.map((record, index) => (
              <li key={index}>
                日期: {record.eat_date} | 食物ID: {record.fid} | 數量: {record.food_num} | 卡路里: {record.calories}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FoodRecordPanel;
