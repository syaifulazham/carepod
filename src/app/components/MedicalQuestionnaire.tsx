// app/components/MedicalQuestionnaire.tsx
'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Question } from '@/types/types';

type MedicalQuestionnaireProps = {
  questions: Question[];
  onComplete: (answers: { [key: string]: string | string[] }) => void;
};

const MedicalQuestionnaire: React.FC<MedicalQuestionnaireProps> = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>({});

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer: string | string[]) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: answer }));
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      onComplete(answers);
    }
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'multiple_option':
        return (
          <div>
            {currentQuestion.options?.map(option => (
              <Button
                key={option}
                variant="outline"
                onClick={() => handleAnswer(option)}
                className="m-1"
              >
                {option}
              </Button>
            ))}
          </div>
        );
      case 'single_option':
        return (
          <div>
            {currentQuestion.options?.map(option => (
              <Button
                key={option}
                variant="outline"
                onClick={() => handleAnswer(option)}
                className="m-1"
              >
                {option}
              </Button>
            ))}
          </div>
        );
      case 'range':
        return (
          <input
            type="range"
            min={currentQuestion.min}
            max={currentQuestion.max}
            onChange={(e) => handleAnswer(e.target.value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{currentQuestion.question}</h3>
      {renderQuestion()}
    </div>
  );
};

export default MedicalQuestionnaire;
