// services/api.ts

import axios from 'axios';
import { Quiz, QuizListItem, QuizCreateData } from '../types/quiz.types';

const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/quizzes`, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getQuizzes = async (): Promise<QuizListItem[]> => {
  const response = await apiClient.get('/');
  return response.data;
};

export const getQuizById = async (id: string): Promise<Quiz> => {
  const response = await apiClient.get(`/${id}`);
  return response.data;
};

export const createQuiz = async (data: QuizCreateData): Promise<Quiz> => {
  const response = await apiClient.post('/', data);
  return response.data;
};

export const deleteQuiz = async (id: string): Promise<void> => {
  await apiClient.delete(`/${id}`);
};