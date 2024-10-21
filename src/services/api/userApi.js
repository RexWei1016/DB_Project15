import { isMock } from '../../utils/config';

// 模擬的用戶 API
const mockUserLogin = async (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'admin15' && password === 'admin15') {
        resolve({ status: 'success' });
      } else {
        reject({ status: 'error', message: 'Invalid credentials' });
      }
    }, 1000);
  });
};

// 真實的用戶 API
const realUserLogin = async (username, password) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }
  return await response.json();
};

// 根據環境變數選擇模擬或真實的 API
export const login = isMock ? mockUserLogin : realUserLogin;


// 模擬的每日監控數據 API
const mockGetDailyMonitorData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        m_date: '2024-10-01',
        weight: 68,
        height: 175,
        b_pressure: '120/80',
        sleep_duration: 7,
        sleep_quality: '良好',
      });
    }, 1000);
  });
};

// 真實的每日監控數據 API
const realGetDailyMonitorData = async () => {
  const response = await fetch('/api/daily-monitor', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch daily monitor data');
  }
  return await response.json();
};

// 根據環境變數選擇模擬或真實的 API
export const getDailyMonitorData = isMock ? mockGetDailyMonitorData : realGetDailyMonitorData;

// 模擬的運動紀錄提交 API
const mockSubmitExerciseRecord = async (exerciseData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ status: 'success' });
      }, 1000);
    });
  };
  
  // 真實的運動紀錄提交 API
  const realSubmitExerciseRecord = async (exerciseData) => {
    const response = await fetch('/api/exercise-record', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(exerciseData),
    });
  
    if (!response.ok) {
      throw new Error('Failed to submit exercise record');
    }
    return await response.json();
  };
  
  // 根據環境變數選擇模擬或真實的 API
  export const submitExerciseRecord = isMock ? mockSubmitExerciseRecord : realSubmitExerciseRecord;
  
  // 模擬的飲食紀錄提交 API
const mockSubmitFoodRecord = async (foodData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ status: 'success' });
      }, 1000);
    });
  };
  
  // 真實的飲食紀錄提交 API
  const realSubmitFoodRecord = async (foodData) => {
    const response = await fetch('/api/food-record', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(foodData),
    });
  
    if (!response.ok) {
      throw new Error('Failed to submit food record');
    }
    return await response.json();
  };
  
  // 根據環境變數選擇模擬或真實的 API
  export const submitFoodRecord = isMock ? mockSubmitFoodRecord : realSubmitFoodRecord;
  
  // 模擬的諮詢提交 API
const mockSubmitConsultation = async (consultationData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ status: 'success' });
      }, 1000);
    });
  };
  
  // 真實的諮詢提交 API
  const realSubmitConsultation = async (consultationData) => {
    const response = await fetch('/api/consultation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(consultationData),
    });
  
    if (!response.ok) {
      throw new Error('Failed to submit consultation');
    }
    return await response.json();
  };
  
  // 根據環境變數選擇模擬或真實的 API
  export const submitConsultation = isMock ? mockSubmitConsultation : realSubmitConsultation;
  