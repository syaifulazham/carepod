import { useState } from 'react';
import { Question } from '../../../types/types';

interface RangeQuestionProps {
  question: Question;
  onAnswer: (answer: number) => void;
}

export default function RangeQuestion({ question, onAnswer }: RangeQuestionProps) {
  const [value, setValue] = useState<number>(question.min || 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    onAnswer(newValue);
  };

  return (
    <div className='flex flex-col items-center justify-center py-8'>
      <label className='text-lg'>{question.question}</label>
      <input 
        className='w-full'
        type="range" 
        min={question.min || 0} 
        max={question.max || 100} 
        value={value} 
        onChange={handleChange}
      />
      <span className='text-4xl font-semibold'>{value}</span>
    </div>
  );
}
