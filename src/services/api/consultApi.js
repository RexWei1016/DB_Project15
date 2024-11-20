import { isMock } from '../../utils/config';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

// 真實的諮詢提交 API
const realSubmitConsultation = async (consultationData) => {
  const response = await fetch(`${API_BASE_URL}/consultation`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(consultationData),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.error || 'Failed to submit consultation');
  }
  return await response.json();
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

// 根據環境變數選擇模擬或真實的 API
export const submitConsultation = isMock
  ? mockSubmitConsultation
  : realSubmitConsultation;
