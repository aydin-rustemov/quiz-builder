

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { QuizFormSchema, QuizFormType, QuestionFormType } from '@/models/quiz';

export const useQuizForm = () => {
  const form = useForm<QuizFormType>({
    resolver: zodResolver(QuizFormSchema),
    defaultValues: {
      title: '',
      questions: [
        { text: '', type: 'INPUT', answers: [{ text: '', isCorrect: true }] },
      ],
    },
  });

  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const appendQuestion = (question?: QuestionFormType) => {
    append(question || { text: '', type: 'INPUT', answers: [{ text: '', isCorrect: true }] });
  };

  const removeQuestion = (index: number) => {
    remove(index);
  };

  return {
    form,
    questions: fields,
    appendQuestion,
    removeQuestion,
  };
};
