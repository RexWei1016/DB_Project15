import React, { useState, useEffect } from 'react';
import './HealthRecordPanel.css';
import { getDailyMonitorData } from '../../services/api/monitorApi';
import { fetchAllUsers } from '../../services/api/userApi'; // 使用者清單的API

function CoachHealthRecordPanel() {
  const [userList, setUserList] = useState([]); // 使用者清單
  const [selectedUserID, setSelectedUserID] = useState(''); // 選擇的使用者ID
  const [monitorDataList, setMonitorDataList] = useState([]); // 監控數據清單
  const [selectedDate, setSelectedDate] = useState(''); // 選擇的日期
  const [monitorData, setMonitorData] = useState({}); // 單筆數據詳細資料

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

  // 根據選擇的使用者ID獲取紀錄數據
  const fetchData = async (userID) => {
    try {
      const response = await getDailyMonitorData(userID);
      if (response.data && response.data.length > 0) {
        setMonitorDataList(response.data);
        setSelectedDate(response.data[0].m_date);
      } else {
        setMonitorDataList([]);
        setMonitorData({});
        setSelectedDate('');
        alert('此使用者沒有紀錄數據');
      }
    } catch (error) {
      console.error('Failed to fetch daily monitor data', error);
    }
  };

  // 使用者選擇改變時重新拉取數據
  const handleUserSelection = (userID) => {
    setSelectedUserID(userID);
    fetchData(userID);
  };

  // 日期選擇變化時更新顯示的紀錄詳細資料
  useEffect(() => {
    if (selectedDate) {
      const selectedData = monitorDataList.find((item) => item.m_date === selectedDate);
      if (selectedData) {
        setMonitorData(selectedData);
      }
    }
  }, [selectedDate, monitorDataList]);

  return (
    <div className="HealthRecordPanel">
      <h1>健康紀錄面板</h1>

      <div className="main-container">
        {/* 左側清單：顯示所有使用者 */}
        <div className="left-panel">
          <h3>選擇使用者</h3>
          <ul className="user-list">
            {userList.map((user) => (
              <li
                key={user.ID}
                className={`user-item ${user.ID === selectedUserID ? 'selected' : ''}`}
                onClick={() => handleUserSelection(user.ID)}
              >
                {user.name} ({user.ID})
              </li>
            ))}
          </ul>
        </div>

        {/* 中間清單：顯示所選使用者的紀錄日期 */}
        <div className="middle-panel">
          <h3>選擇紀錄日期</h3>
          <ul className="date-list">
            {monitorDataList.map((data) => (
              <li
                key={data.m_date}
                className={`date-item ${data.m_date === selectedDate ? 'selected' : ''}`}
                onClick={() => setSelectedDate(data.m_date)}
              >
                {data.m_date}
              </li>
            ))}
          </ul>
        </div>

        {/* 右側顯示選擇的日期詳細數據 */}
        <div className="right-panel">
          <div className="record-container">
            {monitorData.m_date ? (
              <>
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

export default CoachHealthRecordPanel;
