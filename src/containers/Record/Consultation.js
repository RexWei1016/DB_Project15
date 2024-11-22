import React, { useEffect, useState } from 'react';
import styles from './Consultation.css'; // 引入 CSS Modules
import { submitConsultation, getConsultationsByUser, fetchAllCoaches } from '../../services/api/consultApi'; // 引入API請求
import ConsultationHistory from './ConsultationHistory';

function Consultation() {
  const [consultationData, setConsultationData] = useState({
    cID: '',
    ID: '',
    con_time: '',
    content: '',
  });
  const [userId, setUserId] = useState('');
  const [consultations, setConsultations] = useState([]);
  const [error, setError] = useState('');
  const [coaches, setCoaches] = useState([]); // 初始值為空陣列，避免 undefined 的問題
  const [showErrorModal, setShowErrorModal] = useState(false); // 控制錯誤懸浮窗口的顯示

  useEffect(() => {
    const storedUserId = localStorage.getItem('userID');
    if (storedUserId) {
      setUserId(storedUserId);
      setConsultationData((prevData) => ({ ...prevData, ID: storedUserId }));
      fetchConsultations(storedUserId);
    } else {
      setError('未找到使用者ID，請先登入。');
      setShowErrorModal(true); // 顯示錯誤信息
    }
    // 獲取教練列表
    fetchAllCoachesList();
  }, []);

  const fetchAllCoachesList = async () => {
    try {
      const response = await fetchAllCoaches(); // 使用 API 獲取教練列表
      setCoaches(response); // 將教練列表保存到 state 中
    } catch (error) {
      console.error('獲取教練列表失敗', error);
      setError('獲取教練列表失敗，請稍後再試。');
      setShowErrorModal(true); // 顯示錯誤信息
    }
  };

  const fetchConsultations = async (userId) => {
    try {
      const response = await getConsultationsByUser(userId); // 使用 API 獲取諮詢紀錄
      setConsultations(response);
    } catch (error) {
      setError('獲取諮詢紀錄失敗，請稍後再試。');
      setShowErrorModal(true); // 顯示錯誤信息
      console.error('獲取諮詢紀錄失敗', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsultationData({
      ...consultationData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDateTime = new Date();

    const year = currentDateTime.getFullYear();
    const month = String(currentDateTime.getMonth() + 1).padStart(2, '0');
    const day = String(currentDateTime.getDate()).padStart(2, '0');
    const hours = String(currentDateTime.getHours()).padStart(2, '0');
    const minutes = String(currentDateTime.getMinutes()).padStart(2, '0');
    const seconds = String(currentDateTime.getSeconds()).padStart(2, '0');

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    try {
      const consultationToSubmit = {
        ...consultationData,
        con_time: formattedDateTime,
      };

      const responseBody = await submitConsultation(consultationToSubmit);
      console.log('API 成功回應:', responseBody);

      if (responseBody.message === "Record created successfully") {
        alert('諮詢成功提交！');
        setConsultationData({ cID: '', ID: userId, con_time: '', content: '' });
        setError('');
        setConsultations([]);
        fetchConsultations(userId);
      } else {
        throw new Error(responseBody.error || '提交諮詢失敗，請稍後再試。');
      }
    } catch (error) {
      console.error('提交諮詢失敗', error);
      setError(error.message || '提交諮詢失敗，請稍後再試。');
      setShowErrorModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowErrorModal(false);
    setError('');
  };


  return (
    <div className="Consultation">
      <h1>諮詢健康教練</h1>
      <form onSubmit={handleSubmit} className="record-form">
        <div className="form-item">
          <label>諮詢教練 (cID):</label>
          <select
            name="cID"
            value={consultationData.cID}
            onChange={handleChange}
            required
          >
            <option value="" disabled>選擇教練</option>
            {coaches && coaches.length > 0 ? (
              coaches.map((coach) => (
                <option key={coach.cID} value={coach.cID}>
                  {coach.name} ({coach.cID})
                </option>
              ))
            ) : (
              <option value="" disabled>無可用教練</option>
            )}
          </select>
        </div>
        <div className="form-item">
          <label>諮詢內容:</label>
          <textarea
            name="content"
            value={consultationData.content}
            onChange={handleChange}
            placeholder="輸入您的問題或需求"
            rows="5"
            required
          />
        </div>
        <button type="submit" className="Consultation-button">
          提交諮詢
        </button>
      </form>

      {showErrorModal && (
        <div className="error-modal">
          <div className="error-modal-content">
            <span className="close-button" onClick={handleCloseModal}>&times;</span>
            <p>{error}</p>
          </div>
        </div>
      )}

      <ConsultationHistory consultations={consultations} error={error} />
    </div>
  );
}

export default Consultation;