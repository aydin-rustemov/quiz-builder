// src/services/quiz.service.ts

import prisma from '../prisma';
import { QuizCreateRequest } from '../models/quiz.model';

export const createQuizService = async (data: QuizCreateRequest) => {
  const newQuiz = await prisma.quiz.create({
    data: {
      title: data.title,
      questions: {
        create: data.questions.map((question) => ({
          text: question.text,
          type: question.type,
          answers: {
            create: question.answers.map((answer) => ({
              text: answer.text,
              isCorrect: answer.isCorrect,
            })),
          },
        })),
      },
    },
    include: {
      questions: {
        include: {
          answers: true,
        },
      },
    },
  });

  return newQuiz;
};

export const getQuizzesService = async () => {
  const quizzes = await prisma.quiz.findMany({
    select: {
      id: true,
      title: true,
      _count: {
        select: {
          questions: true,
        },
      },
    },
  });

  return quizzes.map(quiz => ({
    id: quiz.id,
    title: quiz.title,
    questionCount: quiz._count.questions,
  }));
};

export const getQuizByIdService = async (id: string) => {
  const quiz = await prisma.quiz.findUnique({
    where: {
      id,
    },
    include: {
      questions: {
        include: {
          answers: true,
        },
      },
    },
  });

  return quiz;
};

export const deleteQuizService = async (id: string) => {
  const deletedQuiz = await prisma.quiz.delete({
    where: {
      id,
    },
  });

  return deletedQuiz;
};