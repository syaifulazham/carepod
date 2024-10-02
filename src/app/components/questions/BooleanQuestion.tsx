import { useState } from 'react';
import { Question } from '../../../types/types';

interface BooleanQuestionProps {
  question: Question;
  onAnswer: (answer: boolean) => void;
}

export default function BooleanQuestion({ question, onAnswer }: BooleanQuestionProps) {
  const [value, setValue] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    setValue(newValue);
    onAnswer(newValue);
  };

  return (
    <div className='flex flex-col items-center justify-center py-8'>
      <label className='text-lg font-semibold'>{question.question}</label>
      <input 
        type="checkbox" 
        checked={value} 
        onChange={handleChange} 
      />
    </div>
  );
}
