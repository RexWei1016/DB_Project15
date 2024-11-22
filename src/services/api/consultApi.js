import { isMock } from '../../utils/config';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

// 真實的諮詢提交 API
const realSubmitConsultation = async (consultationData) => {
  const response = await fetch(`${API_BASE_URL}/consultation/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(consultationData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.error || 'Failed to submit consultation');
  }

  return responseBody;
};

// 獲取某使用者的諮詢紀錄
const realGetConsultationsByUser = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/consultation/${userId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const responseBody = await response.json();

  if (response.status === 404) {
    throw new Error(responseBody.message || 'No records found');
  }

  if (!response.ok) {
    throw new Error(responseBody.error || 'Failed to fetch consultation records');
  }

  return responseBody.data; // 回傳資料
};

// 刪除特定諮詢紀錄
const realDeleteConsultation = async (cID, userId, conTime) => {
  const response = await fetch(`${API_BASE_URL}/consultation/${cID}/${userId}/${conTime}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.error || 'Failed to delete consultation record');
  }

  return responseBody.message; // 回傳成功訊息
};

// 真實查詢所有教練 API
const realFetchAllCoaches = async () => {
  const response = await fetch(`${API_BASE_URL}/coach/all`, {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.error || 'Failed to fetch coaches');
  }

  return responseBody.coaches; // 回傳教練列表
};

// 模擬的諮詢提交 API
const mockSubmitConsultation = async (consultationData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 'success',
        message: 'Consultation submitted successfully',
        data: consultationData,
      });
    }, 1000);
  });
};

// 模擬的獲取諮詢紀錄 API
const mockGetConsultationsByUser = async (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId === 'notfound') {
        reject(new Error('No records found'));
      } else {
        resolve({
          status: 'success',
          message: `Consultations for user ${userId} fetched successfully`,
          data: [
            // 模擬數據
            {
              cID: 1,
              ID: userId,
              con_time: '2023-11-21 10:00:00',
              content: 'Mock consultation content 1',
            },
            {
              cID: 2,
              ID: userId,
              con_time: '2023-11-21 11:00:00',
              content: 'Mock consultation content 2',
            },
          ],
        });
      }
    }, 1000);
  });
};

// 模擬的刪除諮詢紀錄 API
const mockDeleteConsultation = async (cID, userId, conTime) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 'success',
        message: `Consultation for coach ${cID} and user ${userId} at time ${conTime} deleted successfully`,
      });
    }, 1000);
  });
};

// 模擬的查詢所有教練 API
const mockFetchAllCoaches = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { cID: 'Rex', name: '韋承儒', onboarding: '2024-11-21', exp: 'WG' },
        { cID: 'Jane', name: '簡恩', onboarding: '2024-10-15', exp: 'Nutrition' },
      ]);
    }, 1000);
  });
};

// 根據環境變數選擇模擬或真實的 API
export const submitConsultation = isMock ? mockSubmitConsultation : realSubmitConsultation;
export const getConsultationsByUser = isMock ? mockGetConsultationsByUser : realGetConsultationsByUser;
export const deleteConsultation = isMock ? mockDeleteConsultation : realDeleteConsultation;
export const fetchAllCoaches = isMock ? mockFetchAllCoaches : realFetchAllCoaches;
