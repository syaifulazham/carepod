// src/components/questions/DynamicForm.tsx
import { useState } from 'react';
import { Question, Answer } from '../../../types/types';
import FreeTextQuestion from './FreeTextQuestion';
import SingleOptionQuestion from './SingleOptionQuestion';
import MultipleOptionQuestion from './MultipleOptionQuestion';
import RangeQuestion from './RangeQuestion';
import NumberQuestion from './NumberQuestion';
import BooleanQuestion from './BooleanQuestion';

interface DynamicFormProps {
  questions: Question[];
  onSubmit: (answers: Answer[]) => void;
}

export default function DynamicForm({ questions, onSubmit }: DynamicFormProps) {
  const [answers, setAnswers] = useState<Answer[]>([]);

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers((prev) => {
      const existingAnswerIndex = prev.findIndex((a) => a.questionId === questionId);
      const updatedAnswers = [...prev];

      if (existingAnswerIndex > -1) {
        updatedAnswers[existingAnswerIndex] = { questionId, value };
      } else {
        updatedAnswers.push({ questionId, value });
      }

      return updatedAnswers;
    });
  };

  const handleSubmit = () => {
    onSubmit(answers);
  };

  return (
    <div>
      {questions.map((question) => {
        switch (question.type) {
          case 'free_text':
            return (
              <FreeTextQuestion
                key={question.id}
                question={question}
                onAnswer={(value) => handleAnswer(question.id, value)}
              />
            );
          case 'single_option':
            return (
              <SingleOptionQuestion
                key={question.id}
                question={question}
                onAnswer={(value) => handleAnswer(question.id, value)}
              />
            );
          case 'multiple_option':
            return (
              <MultipleOptionQuestion
                key={question.id}
                question={question}
                onAnswer={(value) => handleAnswer(question.id, value)}
              />
            );
          case 'range':
            return (
              <RangeQuestion
                key={question.id}
                question={question}
                onAnswer={(value) => handleAnswer(question.id, value)}
              />
            );
          case 'number':
            return (
              <NumberQuestion
                key={question.id}
                question={question}
                onAnswer={(value) => handleAnswer(question.id, value)}
              />
            );
          case 'boolean':
            return (
              <BooleanQuestion
                key={question.id}
                question={question}
                onAnswer={(value) => handleAnswer(question.id, value)}
              />
            );
          default:
            return null;
        }
      })}
      <button type="button" onClick={handleSubmit}>Submit</button>
    </div>
  );
}
