import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/api/userApi';  // 使用模塊化的用戶API

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await login(username, password);
      if (response.status === 'success') {
        navigate('/Main'); // 登錄成功後跳轉到管理首頁
      }
    } catch (error) {
      alert(error.message || 'Invalid credentials, please try again!');
    }
  };

  return (
    <div className="Login">
      <header className="Login-header">
        <h1>健健美 - 登入</h1>
        <form onSubmit={handleLogin} className="Login-form">
          <input
            type="text"
            placeholder="帳號"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="密碼"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="Login-button">
            登入
          </button>
        </form>
      </header>
    </div>
  );
}

export default Login;
