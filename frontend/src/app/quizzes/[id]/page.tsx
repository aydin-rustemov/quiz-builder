'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getQuizById } from '@/services/api';
import type { Quiz } from '@/types/quiz.types';
import { QuizDetailHeader } from '@/components/quiz/QuizDetailHeader';
import { QuestionCard } from '@/components/quiz/QuestionCard';

// Ümumi komponentlər
const LoadingIndicator = () => (
  <div className="flex items-center justify-center h-screen">
    <p className="text-lg text-gray-500">Loading Quiz Details...</p>
  </div>
);

const ErrorDisplay = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center h-screen text-center">
    <p className="text-red-600 mb-4">{message}</p>
    <Link
      href="/quizzes"
      className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
    >
      Back to Quizzes
    </Link>
  </div>
);

// Əsas səhifə komponenti
export default function QuizDetailPage({ params }: { params: { id: string } }) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!params.id) return;
      try {
        setLoading(true);
        const data = await getQuizById(params.id);
        setQuiz(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch quiz details:', err);
        setError('Failed to load quiz details. The quiz may not exist or the server is down.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [params.id]);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error || !quiz) {
    return <ErrorDisplay message={error || 'Quiz not found.'} />;
  }

  return (
    <main className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <QuizDetailHeader title={quiz.title} />
      <div className="space-y-8">
        {quiz.questions.map((question, index) => (
          <QuestionCard key={question.id} question={question} index={index} />
        ))}
      </div>
    </main>
  );
}
