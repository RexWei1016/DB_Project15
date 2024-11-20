import { isMock } from '../../utils/config';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

// 真實每日監控數據 API
const realGetDailyMonitorData = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/daily_monitor/${userId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.error || 'Failed to fetch daily monitor data');
  }
  return await response.json();
};

// 模擬每日監控數據 API
const mockGetDailyMonitorData = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user_id: userId,
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

// 根據環境變數選擇模擬或真實的 API
export const getDailyMonitorData = isMock ? mockGetDailyMonitorData : realGetDailyMonitorData;



    // 真實的每日監控數據寫入 API
    const realSubmitDailyMonitorData = async (monitorData) => {
        const response = await fetch(`${API_BASE_URL}/daily_monitor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(monitorData),
        });
    
        console.log(response)
        if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'Failed to submit daily monitor data');
        }
        return await response.json();
    };
    
  // 模擬的每日監控數據寫入 API
  const mockSubmitDailyMonitorData = async (monitorData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: 'Daily monitor data submitted successfully' });
      }, 1000);
    });
  };
  
  // 根據環境變數選擇模擬或真實的 API
  export const submitDailyMonitorData = isMock
    ? mockSubmitDailyMonitorData
    : realSubmitDailyMonitorData;