import React, { useEffect, useState } from 'react';
import styles from './CoachConsultationManagement.module.css'; // 引入 CSS Modules
import { getConsultationsByCoach, updateConsultationContent } from '../../services/api/consultApi'; // 引入 API 請求

function CoachConsultationManagement() {
  const [coachID, setCoachID] = useState(null); // 儲存教練 ID
  const [consultations, setConsultations] = useState([]);
  const [error, setError] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [updatedContent, setUpdatedContent] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false); // 控制錯誤懸浮窗口的顯示

  useEffect(() => {
    // 從 localStorage 獲取角色和使用者 ID
    const storedRole = localStorage.getItem('role');
    const storedUserId = localStorage.getItem('userID');

    // 如果角色是教練，則將 userID 當作 coachID 使用
    if (storedRole === 'coach' && storedUserId) {
      setCoachID(storedUserId); // 將教練 ID 存入狀態
      fetchConsultations(storedUserId);
    } else {
      setError('未找到教練 ID，請先登入。');
      setShowErrorModal(true); // 顯示錯誤信息
    }
  }, []);

  const fetchConsultations = async (cID) => {
    try {
      const response = await getConsultationsByCoach(cID); // 使用 API 獲取諮詢紀錄
      setConsultations(response);
    } catch (error) {
      setError('獲取諮詢紀錄失敗，請稍後再試。');
      setShowErrorModal(true); // 顯示錯誤信息
      console.error('獲取諮詢紀錄失敗', error);
    }
  };

  const handleEditClick = (index, currentContent) => {
    setEditingIndex(index);
    setUpdatedContent(currentContent);
  };

  const handleUpdate = async (consultation) => {
    try {
      const { ID, con_time } = consultation;
      // 使用狀態中的 coachID
      await updateConsultationContent(coachID, ID, con_time, updatedContent);
      alert('紀錄已成功更新！');
      setEditingIndex(null);
      // 重新加載諮詢紀錄，以顯示更新後的內容
      fetchConsultations(coachID); // 使用已儲存的教練 ID
    } catch (err) {
      console.error('更新諮詢紀錄失敗', err);
      alert('更新失敗，請稍後再試');
    }
  };

  const handleCloseModal = () => {
    setShowErrorModal(false);
    setError('');
  };

  return (
    <div className={styles.consultationManagement}>
      <h1>教練的諮詢管理</h1>
      {showErrorModal && (
        <div className={styles.errorModal}>
          <div className={styles.errorModalContent}>
            <span className={styles.closeButton} onClick={handleCloseModal}>&times;</span>
            <p>{error}</p>
          </div>
        </div>
      )}
      {!error && consultations.length === 0 && (
        <div className={styles.emptyMessage}>暫無諮詢紀錄。</div>
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
                  className={styles.editTextarea}
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

export default CoachConsultationManagement;
