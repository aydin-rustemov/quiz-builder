'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';
import { FaTrash, FaPlus } from 'react-icons/fa';
import { AnswerInput } from './AnswerInput';
import { QuizFormValues } from '@/lib/schemas';
import { useEffect, useRef } from 'react';

interface QuestionFormProps {
  index: number;
  removeQuestion: (index: number) => void;
}

export function QuestionForm({ index, removeQuestion }: QuestionFormProps) {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<QuizFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${index}.answers`,
  });

  const questionType = watch(`questions.${index}.type`);
  
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    remove(); 
    if (questionType === 'BOOLEAN') {
      append({ text: 'True', isCorrect: true });
      append({ text: 'False', isCorrect: false });
    } else if (questionType === 'CHECKBOX') {
      append({ text: '', isCorrect: true });
    } else { // INPUT
      append({ text: '', isCorrect: true });
    }
  }, [questionType, append, remove]); 

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm relative space-y-4">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold text-gray-800">Question {index + 1}</h3>
        <button
          type="button"
          onClick={() => removeQuestion(index)}
          className="text-gray-400 hover:text-red-600"
        >
          <FaTrash size={20} />
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
        <input
          {...register(`questions.${index}.text`)}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="e.g., What is the capital of Azerbaijan?"
        />
        {errors.questions?.[index]?.text && (
          <p className="text-red-500 mt-1 text-sm">{errors.questions[index]?.text?.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Question Type</label>
        <select
          {...register(`questions.${index}.type`)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="INPUT">Text Input</option>
          <option value="BOOLEAN">True/False</option>
          <option value="CHECKBOX">Multiple Choice</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Answers</label>
        {fields.map((answer, answerIndex) => (
          <AnswerInput
            key={answer.id}
            questionType={questionType}
            questionIndex={index}
            answerIndex={answerIndex}
            removeAnswer={remove}
            numAnswers={fields.length}
          />
        ))}
         {errors.questions?.[index]?.answers && (
          <p className="text-red-500 mt-1 text-sm">{errors.questions[index]?.answers?.root?.message}</p>
        )}
        {questionType === 'CHECKBOX' && (
          <button
            type="button"
            onClick={() => append({ text: '', isCorrect: false })}
            className="flex items-center gap-1 text-sm text-blue-600 hover:underline mt-2"
          >
            <FaPlus size={12} /> Add another answer
          </button>
        )}
      </div>
    </div>
  );
}
