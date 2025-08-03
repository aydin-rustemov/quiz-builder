'use client';

import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

interface QuizDetailHeaderProps {
  title: string;
}

export function QuizDetailHeader({ title }: QuizDetailHeaderProps) {
  return (
    <div className="mb-8">
      <Link
        href="/quizzes"
        className="text-blue-600 hover:underline mb-4 flex items-center gap-2"
      >
        <FaArrowLeft /> Back to All Quizzes
      </Link>
      <h1 className="text-4xl font-bold text-gray-800 border-b pb-4">{title}</h1>
    </div>
  );
}
