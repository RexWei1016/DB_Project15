import { isMock } from '../../utils/config';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

// 真實的新增食物 API 請求
const realSubmitFood = async (foodData) => {
  const response = await fetch(`${API_BASE_URL}/food/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(foodData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to submit food data');
  }
  return result;
};

// 模擬的新增食物 API 請求
const mockSubmitFood = async (foodData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: '食物新增成功' });
    }, 1000);
  });
};

// 根據配置使用真實或模擬的 API
export const submitFood = isMock ? mockSubmitFood : realSubmitFood;

// 真實的查詢全部食物 API 請求
const realGetAllFoods = async () => {
  const response = await fetch(`${API_BASE_URL}/food/`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to fetch food data');
  }
  return result;
};

// 模擬的查詢全部食物 API 請求
const mockGetAllFoods = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: [
          { fid: 1, food_type: '御飯糰', food_calories: 500 },
          { fid: 2, food_type: '沙拉', food_calories: 150 },
          { fid: 3, food_type: '炸雞', food_calories: 600 },
        ],
      });
    }, 1000);
  });
};

// 根據配置使用真實或模擬的 API
export const getAllFoods = isMock ? mockGetAllFoods : realGetAllFoods;
