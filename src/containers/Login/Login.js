import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { login, coachLogin } from '../../services/api/userApi'; // 引入API

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isCoach, setIsCoach] = useState(false); // 新增狀態，用於標記是否為教練登入
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };


  const handleLogin = async (event) => {
    event.preventDefault(); // 防止表單的預設提交行為
    try {
      // 調用統一登入 API，並傳入角色參數
      const response = await login(username, password, isCoach ? 'coach' : 'user');
      console.log('Response:', response);
  
      // 存儲用戶輸入的 username 作為 userID
      localStorage.setItem('userID', username);
      localStorage.setItem('role', isCoach ? 'coach' : 'user'); // 存儲角色
  
      alert(response.message || 'Login successful!');
  
      // 根據角色導航到不同的頁面
      if (isCoach) {
        navigate('/CoachMain'); // 跳轉到教練主頁
      } else {
        navigate('/Main'); // 跳轉到主頁
      }
    } catch (error) {
      console.error('Login Error:', error.message);
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

          <div className="role-selection">
            <label>
              <input
                type="radio"
                value="user"
                checked={!isCoach}
                onChange={() => setIsCoach(false)}
              />
              一般使用者
            </label>
            <label>
              <input
                type="radio"
                value="coach"
                checked={isCoach}
                onChange={() => setIsCoach(true)}
              />
              教練
            </label>
          </div>

          <button type="submit" className="Login-button">
            登入
          </button>
        </form>
        <div className="Login-actions">
          <p>還沒有帳號嗎？</p>
          <button
            className="Register-button"
            onClick={() => handleNavigation('/Register')}
          >
            註冊
          </button>
          <button
            className="Register-button"
            onClick={() => handleNavigation('/CoachRegister')}
          >
            教練註冊
          </button>
        </div>
      </header>
    </div>
  );
}

export default Login;
