import { useState } from 'react';
import { Question } from '../../../types/types';

interface FreeTextQuestionProps {
  question: Question;
  onAnswer: (answer: string) => void;
}

export default function FreeTextQuestion({ question, onAnswer }: FreeTextQuestionProps) {
  const [value, setValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onAnswer(e.target.value);
  };

  return (
    <div className='flex flex-col items-center justify-center py-8'>
      
      <label className='text-lg font-semibold'>{question.question}</label>
      <input 
        className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        type="text" 
        value={value} 
        onChange={handleChange} 
        placeholder="Type your answer here"
      />
      
    </div>
  );
}
