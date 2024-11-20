import { isMock } from '../../utils/config';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

// 運動紀錄提交 API
const realSubmitExerciseRecord = async (exerciseData) => {
  const response = await fetch(`${API_BASE_URL}/exercise-record`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(exerciseData),
  });

  if (!response.ok) {
    throw new Error('Failed to submit exercise record');
  }
  return await response.json();
};

const mockSubmitExerciseRecord = async (exerciseData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: 'success' });
    }, 1000);
  });
};

export const submitExerciseRecord = isMock
  ? mockSubmitExerciseRecord
  : realSubmitExerciseRecord;

// 飲食紀錄提交 API
const realSubmitFoodRecord = async (foodData) => {
  const response = await fetch(`${API_BASE_URL}/food-record`, {
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
