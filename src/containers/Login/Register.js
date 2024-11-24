import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/api/userApi'; // 引入註冊 API
import './Register.css';

function Register() {
  const [formData, setFormData] = useState({
    account: '',
    username: '',
    password: '',
    birth: '',
    sex: '',
    cname: '',
    use: '',
    number: '',
    phones: [{ phone: '', phone_type: '' }],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const phones = [...prev.phones];
      phones[index][name] = value;
      return { ...prev, phones };
    });
  };

  const handleAddPhone = () => {
    setFormData((prev) => ({
      ...prev,
      phones: [...prev.phones, { phone: '', phone_type: '' }],
    }));
  };

  const handleRemovePhone = (index) => {
    setFormData((prev) => {
      const phones = [...prev.phones];
      phones.splice(index, 1); // 刪除指定的電話
      return { ...prev, phones };
    });
  };

  const validateForm = () => {
    // 檢查所有欄位是否填寫完整
    for (const [key, value] of Object.entries(formData)) {
      if (key === 'phones') {
        if (value.some((phone) => !phone.phone || !phone.phone_type)) {
          alert('請填寫完整的電話號碼和電話類型');
          return false;
        }
      } else if (!value) {
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
      const response = await register(formData);
      alert(response.message || 'Registration successful!');
      navigate('/'); // 註冊成功後跳轉到登入頁面
    } catch (error) {
      // 捕獲統一的錯誤訊息
      alert(error.error || 'Registration failed, please try again!');
    }
  };
  

  return (
    <div className="Register">
      <header className="Register-header">
        <h1>健健美 - 註冊</h1>
        <form onSubmit={handleRegister} className="Register-form">
          <input
            type="text"
            name="account"
            placeholder="帳號"
            value={formData.account}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="姓名"
            value={formData.username}
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
            type="date"
            name="birth"
            placeholder="生日"
            value={formData.birth}
            onChange={handleChange}
          />
          <select
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            required
          >
            <option value="">性別</option>
            <option value="M">男</option>
            <option value="F">女</option>
          </select>
          <input
            type="text"
            name="cname"
            placeholder="中文姓名"
            value={formData.cname}
            onChange={handleChange}
          />
          <input
            type="text"
            name="use"
            placeholder="用途"
            value={formData.use}
            onChange={handleChange}
          />
          <input
            type="text"
            name="number"
            placeholder="身份證字號"
            value={formData.number}
            onChange={handleChange}
          />
          {formData.phones.map((phone, index) => (
            <div key={index} className="phone-group">
              <input
                type="text"
                name="phone"
                placeholder="電話號碼"
                value={phone.phone}
                onChange={(e) => handlePhoneChange(index, e)}
                required
              />
              <input
                type="text"
                name="phone_type"
                placeholder="電話類型"
                value={phone.phone_type}
                onChange={(e) => handlePhoneChange(index, e)}
              />
              <button type="button" onClick={() => handleRemovePhone(index)}>
                刪除
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddPhone} className="add-phone-button">
            新增電話
          </button>
          <button type="submit" className="Register-button">
            註冊
          </button>
        </form>
      </header>
    </div>
  );
}

export default Register;
