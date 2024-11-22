import React, { useEffect, useState } from 'react';
import styles from './ConsultationHistory.module.css'; // 引入 CSS Modules

import { getConsultationsByUser } from '../../services/api/consultApi';  // API 請求

function ConsultationHistory() {
  const [userId, setUserId] = useState('');
  const [consultations, setConsultations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('userID'); // 從 localStorage 獲取使用者ID
    if (storedUserId) {
      setUserId(storedUserId);
      fetchConsultations(storedUserId);
    } else {
      setError('未找到使用者ID，請先登入。');
    }
  }, []);

  const fetchConsultations = async (userId) => {
    try {
      const response = await getConsultationsByUser(userId); // 使用 API 獲取諮詢紀錄
      setConsultations(response);
    } catch (error) {
      setError('獲取諮詢紀錄失敗，請稍後再試。');
      console.error('獲取諮詢紀錄失敗', error);
    }
  };

  return (
    <div className={styles.consultationHistory}>
      <h1>我的諮詢紀錄</h1>
      {error && <div className={styles.errorMessage}>{error}</div>}
      {!error && consultations.length === 0 && (
        <div className={styles.emptyMessage}>暫無諮詢紀錄。</div>
      )}
      <div className={styles.consultationsList}>
        {consultations.map((consultation) => (
          <div key={consultation.cID} className={styles.consultationItem}>
            <div className={styles.consultationHeader}>
              <h3 className={styles.consultationHeaderTitle}>
                <span className={styles.consultationIcon}>📋</span> 諮詢ID: {consultation.cID}
              </h3>
              <span className={styles.consultationTime}>🕒 {consultation.con_time}</span>
            </div>
            <div className={styles.consultationContent}>
              <p className={styles.consultationContentText}>{consultation.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConsultationHistory;
