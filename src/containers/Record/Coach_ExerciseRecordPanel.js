import React, { useState, useEffect } from 'react';
import { getExerciseHistory } from '../../services/api/recordApi'; // API: 獲取運動紀錄
import { fetchAllUsers } from '../../services/api/userApi'; // API: 獲取使用者清單
import styles from './Coach_ExerciseRecordPanel.module.css';

function CoachExerciseRecordPanel() {
  const [userList, setUserList] = useState([]); // 使用者清單
  const [selectedUserID, setSelectedUserID] = useState(''); // 選擇的使用者ID
  const [exerciseHistory, setExerciseHistory] = useState([]); // 運動紀錄
  const [selectedDateTime, setSelectedDateTime] = useState({ date: '', time: '' });
  const [exerciseData, setExerciseData] = useState({}); // 單筆紀錄詳細資料

  // 取得使用者清單
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetchAllUsers();
        if (response.users) {
          setUserList(response.users);
        }
      } catch (error) {
        console.error('Failed to fetch user list', error);
      }
    };
    fetchUsers();
  }, []);

  // 根據選擇的使用者ID獲取運動紀錄
  const fetchData = async (userID) => {
    try {
      const response = await getExerciseHistory(userID);
      if (response && response.data && response.data.length > 0) {
        setExerciseHistory(response.data);
        const latestRecord = response.data[0];
        setSelectedDateTime({ date: latestRecord.exe_date, time: latestRecord.exe_time });
        setExerciseData(latestRecord);
      } else {
        setExerciseHistory([]);
        setExerciseData({});
        setSelectedDateTime({ date: '', time: '' });
        alert('此使用者沒有運動紀錄');
      }
    } catch (error) {
      console.error('Failed to fetch exercise history data', error);
    }
  };

  // 使用者選擇變化時重新拉取數據
  const handleUserSelection = (userID) => {
    setSelectedUserID(userID);
    fetchData(userID);
  };

  // 日期選擇變化時更新顯示的紀錄詳細資料
  const handleDateSelection = (date, time) => {
    setSelectedDateTime({ date, time });
    const selectedData = exerciseHistory.find((record) => record.exe_date === date && record.exe_time === time);
    if (selectedData) {
      setExerciseData(selectedData);
    } else {
      console.warn('No matching record found for the selected date and time');
    }
  };

  return (
    <div className={styles.ExerciseRecord}>
      <h1>教練運動紀錄面板</h1>

      <div className={styles.mainContainer}>
        {/* 左側清單：顯示所有使用者 */}
        <div className={styles.leftPanel}>
          <h3>選擇使用者</h3>
          <ul className={styles.userList}>
            {userList.map((user) => (
              <li
                key={user.ID}
                className={`${styles.userItem} ${user.ID === selectedUserID ? styles.selected : ''}`}
                onClick={() => handleUserSelection(user.ID)}
              >
                {user.name} ({user.ID})
              </li>
            ))}
          </ul>
        </div>

        {/* 中間清單：顯示所選使用者的運動紀錄 */}
        <div className={styles.middlePanel}>
          <h3>選擇紀錄日期</h3>
          <ul className={styles.dateList}>
            {exerciseHistory.map((record) => (
              <li
                key={`${record.exe_date}-${record.exe_time}`}
                className={`${styles.dateItem} ${record.exe_date === selectedDateTime.date && record.exe_time === selectedDateTime.time ? styles.selected : ''}`}
                onClick={() => handleDateSelection(record.exe_date, record.exe_time)}
              >
                {record.exe_date} {record.exe_time}
              </li>
            ))}
          </ul>
        </div>

        {/* 右側顯示選擇的日期詳細數據 */}
        <div className={styles.rightPanel}>
          <div className={styles.recordContainer}>
            {exerciseData.exe_date ? (
              <>
                <div className={styles.recordItem}>
                  <label>紀錄日期: </label>
                  <span>{exerciseData.exe_date}</span>
                </div>
                <div className={styles.recordItem}>
                  <label>運動時間: </label>
                  <span>{exerciseData.exe_time}</span>
                </div>
                <div className={styles.recordItem}>
                  <label>運動類型: </label>
                  <span>{exerciseData.exe_type}</span>
                </div>
                <div className={styles.recordItem}>
                  <label>消耗卡路里: </label>
                  <span>{exerciseData.calories} kcal</span>
                </div>
              </>
            ) : (
              <p>請選擇日期以查看詳細數據</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoachExerciseRecordPanel;
