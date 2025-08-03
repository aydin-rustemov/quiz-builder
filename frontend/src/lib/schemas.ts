import { z } from 'zod';

export const answerSchema = z.object({
  text: z.string().min(1, 'Answer text is required'),
  isCorrect: z.boolean(),
});

export const QuestionTypeEnum = z.enum(['BOOLEAN', 'INPUT', 'CHECKBOX']);

export const questionSchema = z.object({
  text: z.string().min(1, 'Question text is required'),
  type: QuestionTypeEnum,
  answers: z.array(answerSchema).min(1, 'At least one answer is required'),
});

export const quizSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  questions: z.array(questionSchema).min(1, 'At least one question is required'),
});

export type AnswerFormValues = z.infer<typeof answerSchema>;
export type QuestionFormValues = z.infer<typeof questionSchema>;
export type QuizFormValues = z.infer<typeof quizSchema>;
export type QuestionType = z.infer<typeof QuestionTypeEnum>;
