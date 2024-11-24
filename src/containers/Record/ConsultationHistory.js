import React from 'react';
import styles from './ConsultationHistory.module.css'; // 引入 CSS Modules

function ConsultationHistory({ consultations, error }) {
  return (
    <div className={styles.consultationHistory}>
      <h1>我的諮詢紀錄</h1>
      {error && <div className={styles.errorMessage}>{error}</div>}
      {!error && consultations.length === 0 && (
        <div className={styles.emptyMessage}>暫無諮詢紀錄。</div>
      )}
      <div className={styles.consultationsList}>
        {consultations.map((consultation, index) => (
          <div key={`${consultation.cID}-${index}`} className={styles.consultationItem}>
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
