'use client';

import { useFormContext, Controller, UseFieldArrayRemove } from 'react-hook-form';
import { FaTrash } from 'react-icons/fa';
import { QuizFormValues, QuestionType } from '@/lib/schemas';

interface AnswerInputProps {
  questionType: QuestionType;
  questionIndex: number;
  answerIndex: number;
  removeAnswer: UseFieldArrayRemove;
  numAnswers: number;
}

export function AnswerInput({
  questionType,
  questionIndex,
  answerIndex,
  removeAnswer,
  numAnswers,
}: AnswerInputProps) {
  const { register, control, getValues, setValue } = useFormContext<QuizFormValues>();

  const isBoolean = questionType === 'BOOLEAN';
  const isRadio = questionType === 'INPUT' || questionType === 'BOOLEAN';

  const handleRadioChange = () => {
    const currentAnswers = getValues(`questions.${questionIndex}.answers`);
    const newAnswers = currentAnswers.map((answer, i) => ({
      ...answer,
      isCorrect: i === answerIndex,
    }));
    setValue(`questions.${questionIndex}.answers`, newAnswers, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Controller
        name={`questions.${questionIndex}.answers.${answerIndex}.isCorrect`}
        control={control}
        render={({ field }) => (
          <input
            type={isRadio ? 'radio' : 'checkbox'}
            checked={field.value}
            onChange={isRadio ? handleRadioChange : (e) => field.onChange(e.target.checked)}
            name={`questions.${questionIndex}.answers_radio_group`} 
            className="h-5 w-5 shrink-0 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
        )}
      />
      <input
        {...register(`questions.${questionIndex}.answers.${answerIndex}.text`)}
        readOnly={isBoolean}
        className={`flex-grow p-2 border border-gray-300 rounded-md ${
          isBoolean ? 'bg-gray-100 cursor-not-allowed' : ''
        }`}
        placeholder={questionType === 'INPUT' ? 'Correct answer' : 'Answer option'}
      />
      {questionType === 'CHECKBOX' && numAnswers > 1 && (
        <button
          type="button"
          onClick={() => removeAnswer(answerIndex)}
          className="text-gray-400 hover:text-red-500 p-1"
        >
          <FaTrash />
        </button>
      )}
    </div>
  );
}
