import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerCoach } from '../../services/api/userApi'; // 引入教練註冊 API
import './Register.css';

function CoachRegister() {
  const [formData, setFormData] = useState({
    cID: '',
    name: '',
    password: '',
    onboarding: '',
    exp: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    // 檢查所有欄位是否填寫完整
    for (const [key, value] of Object.entries(formData)) {
      if (!value) {
        alert('所有欄位皆為必填，請確認已填寫完整');
        return false;
      }
    }
    return true;
  };

  const handleRegister = async (event) => {
    event.preventDefault();
  
    // 表單驗證
    if (!validateForm()) return;
  
    try {
      const response = await registerCoach(formData);
      alert(response.message || '註冊成功!');
      navigate('/'); // 註冊成功後跳轉到登入頁面
    } catch (error) {
      // 捕獲統一的錯誤訊息
      alert(error.error || '註冊失敗，請再試一次!');
    }
  };

  return (
    <div className="Register">
      <header className="Register-header">
        <h1>健健美 - 教練註冊</h1>
        <form onSubmit={handleRegister} className="Register-form">
          <input
            type="text"
            name="cID"
            placeholder="教練ID"
            value={formData.cID}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="姓名"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="密碼"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="onboarding"
            placeholder="入職日期"
            value={formData.onboarding}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="exp"
            placeholder="經歷"
            value={formData.exp}
            onChange={handleChange}
            required
          />
          <button type="submit" className="Register-button">
            註冊
          </button>
        </form>
      </header>
    </div>
  );
}

export default CoachRegister;
