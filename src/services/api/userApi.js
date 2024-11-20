import { isMock } from '../../utils/config';

// 取得URL
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || ''; // 預設為空字串

const realLogin = async (identifier, password, role) => {
  // 根據角色選擇 API Endpoint
  const endpoint = role === 'coach' ? '/coach/login' : '/user/login';
  const payload = role === 'coach' ? { cID: identifier, password } : { account: identifier, password };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.error || `${role === 'coach' ? 'Coach' : 'User'} login failed`);
  }
  return await response.json(); // 返回伺服器的成功回應
};

// 模擬登入 API
const mockLogin = async (identifier, password, role) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        (role === 'coach' && identifier === 'coach15' && password === 'coach15') ||
        (role === 'user' && identifier === 'admin15' && password === 'admin15')
      ) {
        resolve({ message: `${role === 'coach' ? 'Coach' : 'User'} login successful` });
      } else {
        reject({ error: 'Invalid credentials' });
      }
    }, 1000);
  });
};

// 根據環境變數選擇模擬或真實的 API
export const login = isMock ? mockLogin : realLogin;




// 真實註冊 API
const realUserRegister = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/user/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    // 確保統一返回錯誤結構
    throw { error: errorResponse.error || 'Registration failed' };
  }
  return await response.json(); // 成功時返回伺服器響應
};


// 模擬註冊 API（僅供測試）
const mockUserRegister = async (userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userData.account === 'testuser') {
        resolve({ message: 'Registration successful' });
      } else {
        // 確保模擬模式的錯誤結構與真實模式一致
        reject({ error: '帳號已存在!' });
      }
    }, 1000);
  });
};


// 根據環境選擇模擬或真實的 API
export const register = isMock ? mockUserRegister : realUserRegister;
