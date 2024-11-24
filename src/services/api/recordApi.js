import { isMock } from '../../utils/config';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';
// 運動紀錄提交 API
const realSubmitExerciseRecord = async (exerciseData) => {
  const response = await fetch(`${API_BASE_URL}/exercise_record/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(exerciseData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to submit exercise record');
  }
  return result;
};

const mockSubmitExerciseRecord = async (exerciseData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: '運動紀錄成功提交！' });
    }, 1000);
  });
};

export const submitExerciseRecord = isMock
  ? mockSubmitExerciseRecord
  : realSubmitExerciseRecord;

// 運動紀錄查詢 API
const realGetExerciseHistory = async (userID) => {
  const response = await fetch(`${API_BASE_URL}/exercise_record/${userID}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch exercise history');
  }
  return await response.json();
};

const mockGetExerciseHistory = async (userID) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { exe_date: '2024-11-18', exe_type: '跑步', calories: 300 },
        { exe_date: '2024-11-17', exe_type: '游泳', calories: 400 },
      ]);
    }, 1000);
  });
};

export const getExerciseHistory = isMock
  ? mockGetExerciseHistory
  : realGetExerciseHistory;

// 飲食紀錄提交 API
const realSubmitFoodRecord = async (foodData) => {
  const response = await fetch(`${API_BASE_URL}/food_record/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(foodData),
  });

  if (!response.ok) {
    throw new Error('Failed to submit food record');
  }
  return await response.json();
};

const mockSubmitFoodRecord = async (foodData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: 'success' });
    }, 1000);
  });
};

export const submitFoodRecord = isMock
  ? mockSubmitFoodRecord
  : realSubmitFoodRecord;

  
// 飲食紀錄查詢 API
const realGetFoodRecord = async (userID) => {
  const response = await fetch(`${API_BASE_URL}/food_record/${userID}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch food record');
  }

  return await response.json();
};

const mockGetFoodRecord = async (userID) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: [
          {
            eat_date: '2024-11-21',
            fid: 3,
            food_num: 2,
            calories: 300,
          },
          {
            eat_date: '2024-11-21',
            fid: 1,
            food_num: 2,
            calories: 1000,
          },
        ],
      });
    }, 1000);
  });
};

export const getFoodRecord = isMock
  ? mockGetFoodRecord
  : realGetFoodRecord;