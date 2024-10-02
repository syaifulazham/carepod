import { useState } from "react";
import { BloodPressure } from "../../../types/types";

interface BloodPressureInputProps {
  onAnswer: (data: BloodPressure) => void;
}

export default function BloodPressureInput({ onAnswer }: BloodPressureInputProps) {
  const [systolic, setSystolic] = useState<number | ''>('');
  const [diastolic, setDiastolic] = useState<number | ''>('');
  const [pulse, setPulse] = useState<number | ''>('');

  const handleSubmit = () => {
    if (systolic && diastolic && pulse) {
      onAnswer({ systolic, diastolic, pulse });
    } else {
      alert('Please enter valid systolic, diastolic, and pulse values.');
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">
        Tekanan Darah dan Nadi
      </h2>

      <div className="grid grid-cols-1 gap-4">
        {/* Systolic Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Sistole (mmHg)</label>
          <input
            type="number"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={systolic}
            onChange={(e) => setSystolic(Number(e.target.value))}
            placeholder="Masukkan nilai sistole"
          />
        </div>

        {/* Diastolic Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Diastole (mmHg)</label>
          <input
            type="number"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={diastolic}
            onChange={(e) => setDiastolic(Number(e.target.value))}
            placeholder="Masukkan nilai diastole"
          />
        </div>

        {/* Pulse Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Nadi (bpm)</label>
          <input
            type="number"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={pulse}
            onChange={(e) => {setPulse(Number(e.target.value))}}
            placeholder="Masukkan nilai nadi"
          />
        </div>
      </div>

      <button
        className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
        onClick={handleSubmit}
      >
        OK
      </button>
    </div>
  );
}
