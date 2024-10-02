// src/components/questions/SingleOptionQuestion.tsx
import { useState } from 'react';
import { Question } from '../../../types/types';

interface SingleOptionQuestionProps {
  question: Question;
  onAnswer: (answer: string) => void;
}

export default function SingleOptionQuestion({ question, onAnswer }: SingleOptionQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onAnswer(option);  // Pass the selected answer to the parent component
  };

  return (
    <div className="flex flex-col py-8">
      <label className="mb-4 text-lg">{question.question}</label>
      <div className="grid grid-cols-2 gap-4">
        {question.options?.map((option) => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            className={`py-2 px-4 text-center rounded-lg border transition-colors duration-300 ${
              selectedOption === option
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-gray-100 text-gray-900 border-gray-300 hover:bg-gray-200'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}