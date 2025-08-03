'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getQuizzes, deleteQuiz } from '@/services/api';
import type { QuizListItem as QuizListItemType } from '@/types/quiz.types';
import { QuizListItem } from '@/components/quiz/QuizListItem';
import { ConfirmationModal } from '@/components/common/ConfirmationModal';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <p className="text-lg text-gray-500">Loading...</p>
  </div>
);

const ErrorDisplay = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
  <div className="flex flex-col items-center justify-center h-screen text-center">
    <p className="text-red-600 mb-4">{message}</p>
    <button
      onClick={onRetry}
      className="bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
    >
      Retry
    </button>
  </div>
);

export default function QuizListPage() {
  const [quizzes, setQuizzes] = useState<QuizListItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState<string | null>(null);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const data = await getQuizzes();
      setQuizzes(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch quizzes:', err);
      setError('Failed to load quizzes. Please make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleOpenDeleteModal = (id: string) => {
    setQuizToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!quizToDelete) return;

    try {
      await deleteQuiz(quizToDelete);
      setQuizzes((prevQuizzes) => prevQuizzes.filter((q) => q.id !== quizToDelete));
    } catch (err) {
      console.error('Failed to delete quiz:', err);
      setError('Failed to delete quiz.');
    } finally {
      setIsModalOpen(false);
      setQuizToDelete(null);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} onRetry={fetchQuizzes} />;

  return (
    <>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Quiz"
        message="Are you sure you want to delete this quiz? This action cannot be undone."
      />

      <main className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">All Quizzes</h1>
          <Link
            href="/quizzes/create"
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            Create New Quiz
          </Link>
        </div>

        {quizzes.length === 0 ? (
          <div className="text-center py-16 px-4 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">No quizzes found.</p>
            <p className="text-gray-500 mt-2">Click the button above to create the first one.</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {quizzes.map((quiz) => (
              <QuizListItem key={quiz.id} quiz={quiz} onDelete={handleOpenDeleteModal} />
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
