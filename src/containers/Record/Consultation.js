import React, { useState } from 'react';
import './Consultation.css';
import { submitConsultation } from '../../services/api/userApi';  // API 請求

function Consultation() {
  const [consultationData, setConsultationData] = useState({
    cid: '',
    content: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsultationData({
      ...consultationData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await submitConsultation(consultationData); // API 提交數據
      if (response.status === 'success') {
        alert('諮詢成功提交！');
        setConsultationData({ cid: '', content: '' });
      }
    } catch (error) {
      console.error('提交諮詢失敗', error);
    }
  };

  return (
    <div className="Consultation">
      <h1>諮詢健康教練</h1>
      <form onSubmit={handleSubmit} className="record-form">
        <div className="form-item">
          <label>諮詢ID:</label>
          <input
            type="text"
            name="cid"
            value={consultationData.cid}
            onChange={handleChange}
            placeholder="輸入諮詢ID"
            required
          />
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
    </div>
  );
}

export default Consultation;
