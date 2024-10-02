import { useState } from 'react';
import { Question } from '../../../types/types';

interface NumberQuestionProps {
  question: Question;
  onAnswer: (answer: number) => void;
}

export default function NumberQuestion({ question, onAnswer }: NumberQuestionProps) {
  const [value, setValue] = useState<number | string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    onAnswer(newValue);
  };

  return (
    <div className='flex flex-col items-center justify-center py-8'>
      <label className='text-lg font-semibold'>{question.question}</label>
      <input 
        className='w-full p-2 border border-gray-300 rounded-md'
        type="number" 
        value={value} 
        onChange={handleChange} 
        placeholder="Enter a number"
      />
    </div>
  );
}
