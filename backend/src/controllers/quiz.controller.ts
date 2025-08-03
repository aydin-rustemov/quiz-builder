
import { Request, Response } from 'express';
import { z } from 'zod';
import { QuizCreateSchema } from '../models/quiz.model';
import { createQuizService, deleteQuizService, getQuizByIdService, getQuizzesService } from '../services/quiz.service';

export const createQuiz = async (req: Request, res: Response) => {
  try {
    const validatedData = QuizCreateSchema.parse(req.body);
    const newQuiz = await createQuizService(validatedData);
    res.status(201).json(newQuiz);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.issues });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Failed to create quiz' });
    }
  }
};

export const getQuizzes = async (req: Request, res: Response) => {
  try {
    const quizzes = await getQuizzesService();
    res.status(200).json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve quizzes' });
  }
};

export const getQuizById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const quiz = await getQuizByIdService(id);

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    res.status(200).json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve quiz' });
  }
};

export const deleteQuiz = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const quiz = await getQuizByIdService(id);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    await deleteQuizService(id);
    
    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete quiz' });
  }
};

