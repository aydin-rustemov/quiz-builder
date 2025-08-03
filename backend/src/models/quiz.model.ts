
import { z } from 'zod';

const AnswerSchema = z.object({
  text: z.string().min(1, 'Answer text cannot be empty.'),
  isCorrect: z.boolean(),
});

const QuestionSchema = z.object({
  text: z.string().min(1, 'Question text cannot be empty.'),
  type: z.enum(['BOOLEAN', 'INPUT', 'CHECKBOX']),
  answers: z.array(AnswerSchema).min(1, 'A question must have at least one answer.'),
});

export const QuizCreateSchema = z.object({
  title: z.string().min(3, 'Quiz title must be at least 3 characters long.'),
  questions: z.array(QuestionSchema).min(1, 'A quiz must have at least one question.'),
});

export type QuizCreateRequest = z.infer<typeof QuizCreateSchema>;