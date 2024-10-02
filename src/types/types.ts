// types/types.ts
export type QuestionType = 
  | 'free_text'
  | 'single_option'
  | 'multiple_option'
  | 'range'
  | 'number'
  | 'date'
  | 'time'
  | 'boolean'
  | 'welcome'
  | 'profile'
  | 'blood_pressure';

export interface Question {
  id: string;
  stage: string;
  question: string;
  type: QuestionType;
  options?: string[];  // For 'single_option' and 'multiple_option'
  min?: number;        // For 'range'
  max?: number;        // For 'range'
}

export interface Answer {
  questionId: string;
  value: string | string[] | number | boolean | null | BloodPressure;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface BloodPressure {
  systolic: number;
  diastolic: number;
  pulse: number;
}

export interface PatientDetailsInfo{
  name: string;
  idCardNumber: string;
  address: Address;
  phoneNumber: string;
  birthDate: string;
  age: number;
  gender: string;
  height: number;
  weight: number; 
  bloodType: string;
  handicapped: boolean;
  handicappedType: string;
  handicappedDescription: string;
}