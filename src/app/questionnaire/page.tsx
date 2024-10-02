// src/app/questionnaire/page.tsx
'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import Framer Motion
import { Question, Answer, PatientDetailsInfo } from '../../types/types';
import FreeTextQuestion from '../components/questions/FreeTextQuestion';
import SingleOptionQuestion from '../components/questions/SingleOptionQuestion';
import MultipleOptionQuestion from '../components/questions/MultipleOptionQuestion';
import RangeQuestion from '../components/questions/RangeQuestion';
import NumberQuestion from '../components/questions/NumberQuestion';
import BooleanQuestion from '../components/questions/BooleanQuestion';
import DateQuestion from '../components/questions/DateQuestion';
import Welcome from '../components/Welcome';
import Sequences from '../components/Sequences';
import PatientDetails from '../components/PatientDetails';

import Image from 'next/image';
import Logo from '../lib/images/carepod.png';

//dummy sample data
import { patients } from '../../data/dummieData';


// Sample questions
const sampleQuestions: Question[] = [
  { id: 'q0', stage: 'welcome', question: 'Welcome to CarePod', type: 'welcome' },
  { id: 'q0a', stage: 'profile', question: 'Welcome to CarePod', type: 'profile' },
  { id: 'q0a', stage: 'additional', question: 'Anda hadir untuk lanjutan atau pengobatan lainnya?', type: 'single_option', options: ['Lanjutan', 'Perawatan Lainnya'] },
  { id: 'q2', stage: 'diagnosis', question: 'Apakah gejala kesehatan Anda saat ini?', type: 'multiple_option', options: ['Demam', 'Batuk', 'Sakit Kepala', 'Kelelahan', 'Sesak Napas', 'Mual', 'Muntah', 'Diare', 'Nyeri Dada', 'Tekanan Darah Tinggi', 'Pusing', 'Lemas'] },
  { id: 'q3', stage: 'diagnosis', question: 'Apakah Anda pernah mengalami gejala ini sebelumnya?', type: 'single_option', options: ['Ya', 'Tidak'] },
  { id: 'q5', stage: 'diagnosis', question: 'Apakah Anda memiliki penyakit kronis?', type: 'single_option', options: ['Ya', 'Tidak'] },
  { id: 'q6', stage: 'diagnosis', question: 'Silakan pilih gejala yang Anda alami saat ini:', type: 'multiple_option', options: ['Demam', 'Batuk', 'Sakit Kepala', 'Kelelahan', 'Sesak Napas'] },
  { id: 'q7', stage: 'diagnosis', question: 'Seberapa parah gejala yang Anda rasakan (1-10)?', type: 'range', min: 1, max: 10 },
  { id: 'q8', stage: 'diagnosis', question: 'Apakah Anda sedang minum obat?', type: 'single_option', options: ['Ya', 'Tidak'] },
  { id: 'q9', stage: 'diagnosis', question: 'Apakah Anda memiliki alergi?', type: 'multiple_option', options: ['Tidak ada', 'Serbuk Sari', 'Makanan', 'Obat', 'Lainnya'] },
  { id: 'q10', stage: 'diagnosis', question: 'Apakah Anda baru saja bepergian ke luar negeri dalam 30 hari terakhir?', type: 'single_option', options: ['Ya', 'Tidak'] },
  { id: 'q11', stage: 'diagnosis', question: 'Apakah Anda mengalami mual atau muntah?', type: 'single_option', options: ['Ya', 'Tidak'] },
  { id: 'q12', stage: 'diagnosis', question: 'Apakah Anda mengalami sakit perut?', type: 'single_option', options: ['Ya', 'Tidak'] },
  { id: 'q13', stage: 'diagnosis', question: 'Apakah Anda mengalami diare?', type: 'single_option', options: ['Ya', 'Tidak'] },
  { id: 'q14', stage: 'diagnosis', question: 'Apakah Anda merasa nyeri dada?', type: 'single_option', options: ['Ya', 'Tidak'] },
  { id: 'q15', stage: 'diagnosis', question: 'Apakah Anda memiliki riwayat tekanan darah tinggi?', type: 'single_option', options: ['Ya', 'Tidak'] },
  { id: 'q16', stage: 'diagnosis', question: 'Apakah Anda pernah mengalami sesak napas?', type: 'single_option', options: ['Ya', 'Tidak'] },
  { id: 'q17', stage: 'diagnosis', question: 'Apakah Anda mengalami pembengkakan di bagian tubuh tertentu?', type: 'single_option', options: ['Ya', 'Tidak'] },
  { id: 'q18', stage: 'diagnosis', question: 'Berapa suhu tubuh Anda saat ini (dalam °C)?', type: 'number' },
  { id: 'q19', stage: 'diagnosis', question: 'Apakah Anda merasa pusing?', type: 'single_option', options: ['Ya', 'Tidak'] },
  { id: 'q20', stage: 'diagnosis', question: 'Apakah Anda merasa lemas atau kehilangan energi?', type: 'single_option', options: ['Ya', 'Tidak'] }
];


export default function SequentialQuestionnaire() {
  const defaultPatientDetails = {
    name: '',
    idCardNumber: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    phoneNumber: '',
    birthDate: '',
    age: 0,
    gender: '',
    height: 0,
    weight: 0,
    bloodType: '',
    handicapped: false,
    handicappedType: '',
    handicappedDescription: ''
  };

  const loadPatientDetails = () => {
    setPatientDetails(patients[Math.floor(Math.random() * 10)]);
  };

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [patientDetails, setPatientDetails] = useState<PatientDetailsInfo>();

  const currentQuestion = sampleQuestions[currentStep];

  

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex((a) => a.questionId === questionId);
      const updatedAnswers = [...prevAnswers];

      if (existingAnswerIndex > -1) {
        updatedAnswers[existingAnswerIndex] = { questionId, value };
      } else {
        updatedAnswers.push({ questionId, value });
      }

      return updatedAnswers;
    });
  };

  const handleNext = () => {
    if (currentStep < sampleQuestions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
    if (currentStep === 0) {
      loadPatientDetails();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Final Answers:', answers);
  };

  // Animation variants
  const variants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <div className="flex flex-col w-[50vw] h-screen md:flex-row">
    <Sequences currentStage={currentQuestion.stage} />
    <div className="flex flex-col items-center justify-center p-20 h-[90vh] bg-white w-full rounded-lg md:w-[40vw]">
      
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg md:w-[40vw] w-[90vw]">
        

        {/* AnimatePresence ensures only one question is mounted at a time */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5 }}
          >
            {currentQuestion && (
              <div className="mb-4">
                {(() => {
                  switch (currentQuestion.type) {
                    case 'welcome':
                      return (
                        <Welcome />
                      );
                    case 'profile':
                        return (
                          <PatientDetails patientDetails={patientDetails || defaultPatientDetails} />
                        );
                    case 'free_text':
                      return (
                        <FreeTextQuestion
                          question={currentQuestion}
                          onAnswer={(value) => handleAnswer(currentQuestion.id, value)}
                        />
                      );
                    case 'single_option':
                      return (
                        <SingleOptionQuestion
                          question={currentQuestion}
                          onAnswer={(value) => handleAnswer(currentQuestion.id, value)}
                        />
                      );
                    case 'multiple_option':
                      return (
                        <MultipleOptionQuestion
                          question={currentQuestion}
                          onAnswer={(value) => handleAnswer(currentQuestion.id, value)}
                        />
                      );
                    case 'range':
                      return (
                        <RangeQuestion
                          question={currentQuestion}
                          onAnswer={(value) => handleAnswer(currentQuestion.id, value)}
                        />
                      );
                    case 'number':
                      return (
                        <NumberQuestion
                          question={currentQuestion}
                          onAnswer={(value) => handleAnswer(currentQuestion.id, value)}
                        />
                      );
                    case 'boolean':
                      return (
                        <BooleanQuestion
                          question={currentQuestion}
                          onAnswer={(value) => handleAnswer(currentQuestion.id, value)}
                        />
                      );
                    case 'date':
                      return (
                        <DateQuestion
                          question={currentQuestion}
                          onAnswer={(value) => handleAnswer(currentQuestion.id, value)}
                        />
                      );
                    default:
                      return null;
                  }
                })()}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`px-4 py-2 bg-blue-500 text-white rounded-md ${currentStep === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          >
            Kembali
          </button>

          {currentStep < sampleQuestions.length - 1 ? (
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Selanjutnya
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Selesai
            </button>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
