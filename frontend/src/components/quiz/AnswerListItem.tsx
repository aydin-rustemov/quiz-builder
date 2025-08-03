'use client';

import { FaCheckCircle, FaTimesCircle, FaBullseye } from 'react-icons/fa';
import type { Answer, Question } from '@/types/quiz.types';

interface AnswerListItemProps {
  answer: Answer;
  questionType: Question['type'];
}

export function AnswerListItem({ answer, questionType }: AnswerListItemProps) {
  const getIcon = () => {
    if (questionType === 'INPUT') {
      // INPUT növü üçün yalnız düzgün cavab göstərilir
      return <FaBullseye className="text-blue-600" />;
    }
    if (answer.isCorrect) {
      return <FaCheckCircle className="text-green-600" />;
    }
    return <FaTimesCircle className="text-red-500" />;
  };

  const containerClasses = answer.isCorrect
    ? 'bg-green-50 border-green-200'
    : 'bg-red-50 border-red-200';

  return (
    <div
      className={`flex items-center p-3 rounded-md border ${
        questionType === 'INPUT' ? 'bg-blue-50 border-blue-200' : containerClasses
      }`}
    >
      <span className="mr-3 text-xl">{getIcon()}</span>
      <span className="text-gray-800">{answer.text}</span>
    </div>
  );
}
