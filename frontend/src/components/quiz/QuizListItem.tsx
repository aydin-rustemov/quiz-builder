'use client';

import Link from 'next/link';
import { FaTrash } from 'react-icons/fa';
import type { QuizListItem as QuizListItemType } from '@/types/quiz.types';

interface QuizListItemProps {
  quiz: QuizListItemType;
  onDelete: (id: string) => void;
}

export function QuizListItem({ quiz, onDelete }: QuizListItemProps) {
  return (
    <li className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
      <Link href={`/quizzes/${quiz.id}`} className="flex-grow no-underline text-gray-900 group">
        <span className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
          {quiz.title}
        </span>
        <span className="ml-3 text-sm text-gray-500">
          ({quiz.questionCount} questions)
        </span>
      </Link>
      <button
        onClick={() => onDelete(quiz.id)}
        className="bg-transparent border-none cursor-pointer text-gray-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors"
        aria-label={`Delete ${quiz.title}`}
      >
        <FaTrash />
      </button>
    </li>
  );
}
