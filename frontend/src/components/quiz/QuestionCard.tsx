'use client';

import type { Question } from '@/types/quiz.types';
import { AnswerListItem } from './AnswerListItem';

interface QuestionCardProps {
  question: Question;
  index: number;
}

export function QuestionCard({ question, index }: QuestionCardProps) {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-700">Question {index + 1}</h2>
        <span className="text-sm font-medium text-white bg-gray-500 px-3 py-1 rounded-full">
          {question.type}
        </span>
      </div>
      <p className="mt-4 text-lg text-gray-800">{question.text}</p>
      <div className="mt-4 space-y-2">
        {question.answers.map((answer, answerIndex) => (
          <AnswerListItem key={answerIndex} answer={answer} questionType={question.type} />
        ))}
      </div>
    </div>
  );
}
