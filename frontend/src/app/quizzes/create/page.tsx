'use client';

import { useState } from 'react';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { createQuiz } from '@/services/api';
import { FaPlus, FaSave } from 'react-icons/fa';
import { quizSchema, QuizFormValues } from '@/lib/schemas';
import { QuestionForm } from '@/components/quiz/QuestionForm';

const createNewQuestion = () => ({
  text: '',
  type: 'INPUT' as const,
  answers: [{ text: '', isCorrect: true }],
});

function Notification({ message, type }: { message: string; type: 'success' | 'error' }) {
    if (!message) return null;
    const baseClasses = "p-3 rounded-lg text-white my-4";
    const typeClasses = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    return <div className={`${baseClasses} ${typeClasses}`}>{message}</div>;
}

export default function CreateQuizPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const methods = useForm<QuizFormValues>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: '',
      questions: [createNewQuestion()],
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const onSubmit = async (data: QuizFormValues) => {
    setIsSubmitting(true);
    setNotification(null);
    try {
      await createQuiz(data);
      setNotification({ message: 'Quiz created successfully! Redirecting...', type: 'success' });
      setTimeout(() => router.push('/quizzes'), 2000);
    } catch (error) {
      console.error('Failed to create quiz', error);
      setNotification({ message: 'Error creating quiz. Please try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 border-b pb-4">Create a New Quiz</h1>
      
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2">
              Quiz Title
            </label>
            <input
              id="title"
              {...methods.register('title')}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., General Knowledge"
            />
            {errors.title && <p className="text-red-500 mt-1 text-sm">{errors.title.message}</p>}
          </div>

          <div className="space-y-6">
            {fields.map((field, index) => (
              <QuestionForm key={field.id} index={index} removeQuestion={remove} />
            ))}
             {errors.questions && (
                <p className="text-red-500 mt-1 text-sm">{errors.questions.message}</p>
            )}
          </div>
          
          {notification && <Notification message={notification.message} type={notification.type} />}

          <div className="flex items-center justify-between mt-8">
            <button
              type="button"
              onClick={() => append(createNewQuestion())}
              className="flex items-center gap-2 bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
            >
              <FaPlus /> Add Question
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <FaSave /> {isSubmitting ? 'Saving...' : 'Save Quiz'}
            </button>
          </div>
        </form>
      </FormProvider>
    </main>
  );
}
