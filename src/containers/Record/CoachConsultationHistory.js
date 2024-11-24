import React, { useEffect, useState } from 'react';
import styles from './CoachConsultationHistory.module.css'; // 引入 CSS Modules
import { getConsultationsByCoach, updateConsultationContent } from '../../services/api/consultApi'; // 引入 API 請求

function CoachConsultationHistory() {
  const [coachId, setCoachId] = useState('');
  const [consultations, setConsultations] = useState([]);
  const [error, setError] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [updatedContent, setUpdatedContent] = useState('');

  useEffect(() => {
    // 從 localStorage 獲取角色和使用者 ID
    const storedRole = localStorage.getItem('role');
    const storedUserId = localStorage.getItem('userID');
    console.log(storedUserId);
    // 如果角色是教練，則將 userID 當作 coachID 使用
    if (storedRole === 'coach' && storedUserId) {
      setCoachId(storedUserId);
      fetchConsultations(storedUserId);
    } else {
      setError('未找到教練 ID，請先登入。');
    }
  }, []);

  const fetchConsultations = async (cID) => {
    try {
      const response = await getConsultationsByCoach(cID); // 使用 API 獲取諮詢紀錄
      
      if (response.length === 0) {
        // 當返回空列表時，表示暫無諮詢紀錄
        setConsultations([]);
        setError(''); // 清除錯誤訊息
      } else {
        setConsultations(response);
        setError(''); // 清除錯誤訊息
      }
    } catch (error) {
      if (error.message === 'No records found for this coach') {
        // 當 404 或模擬返回未找到紀錄時，顯示沒有紀錄而不是錯誤
        setConsultations([]);
        setError(''); // 清除錯誤訊息，因為這只是沒有找到任何紀錄
      } else {
        // 其他錯誤才顯示更具體的錯誤訊息
        setError('獲取諮詢紀錄失敗，請稍後再試。');
      }
      console.error('獲取諮詢紀錄失敗', error);
    }
  };
  

  const handleEditClick = (index, currentContent) => {
    setEditingIndex(index);
    setUpdatedContent(currentContent);
  };

  const handleUpdate = async (consultation) => {
    try {
      const { cID, ID, con_time } = consultation;
      await updateConsultationContent(cID, ID, con_time, updatedContent);
      alert('紀錄已成功更新！');
      setEditingIndex(null);
      // 重新加載諮詢紀錄，以顯示更新後的內容
      fetchConsultations(coachId);
    } catch (err) {
      console.error('更新諮詢紀錄失敗', err);
      alert('更新失敗，請稍後再試');
    }
  };

  return (
    <div className={styles.consultationHistory}>
      <h1>教練的諮詢紀錄</h1>
      {error && <div className={styles.errorMessage}>{error}</div>}
      {!error && consultations.length === 0 && (
        <div className={styles.emptyMessage}>
          暫無諮詢紀錄。若需要新增紀錄，請開始新的諮詢！
        </div>
      )}
      <div className={styles.consultationsList}>
        {consultations.map((consultation, index) => (
          <div key={index} className={styles.consultationItem}>
            <div className={styles.consultationHeader}>
              <h3 className={styles.consultationHeaderTitle}>
                <span className={styles.consultationIcon}>📋</span> 使用者 ID: {consultation.ID}
              </h3>
              <span className={styles.consultationTime}>🕒 {consultation.con_time}</span>
            </div>
            {editingIndex === index ? (
              <div className={styles.consultationEdit}>
                <textarea
                  value={updatedContent}
                  onChange={(e) => setUpdatedContent(e.target.value)}
                  rows="3"
                />
                <button onClick={() => handleUpdate(consultation)} className={styles.updateButton}>
                  更新
                </button>
                <button onClick={() => setEditingIndex(null)} className={styles.cancelButton}>
                  取消
                </button>
              </div>
            ) : (
              <div className={styles.consultationContent}>
                <p className={styles.consultationContentText}>{consultation.content}</p>
                <button onClick={() => handleEditClick(index, consultation.content)} className={styles.editButton}>
                  編輯
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoachConsultationHistory;
