// src/components/questions/MultipleOptionQuestion.tsx
import { useState } from 'react';
import { Question } from '../../../types/types';

interface MultipleOptionQuestionProps {
  question: Question;
  onAnswer: (answer: string[]) => void;
}

export default function MultipleOptionQuestion({ question, onAnswer }: MultipleOptionQuestionProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleToggle = (option: string) => {
    let updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((o) => o !== option) // Deselect the option if already selected
      : [...selectedOptions, option]; // Add the option if not selected

    setSelectedOptions(updatedOptions);
    onAnswer(updatedOptions); // Send updated selected options to the parent component
  };

  return (
    <div className="flex flex-col py-8">
      <label className="mb-4 text-lg">{question.question}</label>
      <div className="grid grid-cols-2 gap-4">
        {question.options?.map((option) => (
          <button
            key={option}
            onClick={() => handleToggle(option)}
            className={`py-2 px-4 text-center rounded-lg border transition-colors duration-300 ${
              selectedOptions.includes(option)
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
