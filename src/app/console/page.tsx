// app/console/page.tsx

'use client'

import React, { useState } from 'react';
import MedicalQuestionnaire from '@/app/components/MedicalQuestionnaire';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Heart,
  Thermometer,
  Activity,
  Wind,
  Eye,
  Timer,
  CheckCircle,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { patients } from '@/data/dummieData';
import { PatientDetailsInfo, Question } from '@/types/types';

import KioskLabel from '@/app/components/KioskLabel';

import { MdFingerprint } from "react-icons/md";

const sampleQuestions: Question[] = [
  { id: 'q2', stage: 'diagnosis', question: 'Apakah gejala kesehatan Anda saat ini?', type: 'multiple_option', options: ['Demam', 'Batuk', 'Sakit Kepala', 'Kelelahan', 'Sesak Napas', 'Mual', 'Muntah', 'Diare', 'Nyeri Dada', 'Tekanan Darah Tinggi', 'Pusing', 'Lemas'] },
  { id: 'q3', stage: 'diagnosis', question: 'Apakah Anda pernah mengalami gejala ini sebelumnya?', type: 'single_option', options: ['Ya', 'Tidak'] },
  { id: 'q5', stage: 'diagnosis', question: 'Apakah Anda memiliki penyakit kronis?', type: 'single_option', options: ['Ya', 'Tidak'] },
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
  { id: 'q19', stage: 'diagnosis', question: 'Apakah Anda merasa pusing?', type: 'single_option', options: ['Ya', 'Tidak'] },
  { id: 'q20', stage: 'diagnosis', question: 'Apakah Anda merasa lemas atau kehilangan energi?', type: 'single_option', options: ['Ya', 'Tidak'] },
];

const PemeriksaanUmum = () => {
  const [step, setStep] = useState(0);
  //const [questionnaireResponses, setQuestionnaireResponses] = useState({});

  const handleQuestionnaireComplete = (responses: { [key: string]: string | string[] }) => {
    //setQuestionnaireResponses(responses);
    setStep(3);  // Proceed to the next step after questionnaire completion
  };
  const [selectedPatient, setSelectedPatient] = useState<PatientDetailsInfo | null>(null);

  const [measurements, setMeasurements] = useState({
    bloodPressure: null,
    temperature: null,
    heartRate: null,
    oxygenSat: null,
    retinalScan: null
  });

  const [loading, setLoading] = useState({
    bloodPressure: false,
    temperature: false,
    heartRate: false,
    oxygenSat: false,
    retinalScan: false
  });

  // Simulate patient login
  const handleLogin = () => {
    const randomPatient = patients[Math.floor(Math.random() * patients.length)];
    setSelectedPatient(randomPatient);
    setStep(1);  // Move to the patient profile step
  };

  const renderPatientLogin = () => (
    <div className="space-y-6 flex flex-col w-full justify-center items-center">
      <CardHeader>
        <CardTitle>Login Pasien</CardTitle>
      </CardHeader>
      <CardContent>
        <div onClick={handleLogin} className="bg-blue-500 text-white hover:bg-blue-600 h-[100px] flex items-center justify-center border border-gray-200 rounded-full w-[150px] h-[150px] p-4">
          <MdFingerprint className="text-8xl" />

        </div>
      </CardContent>
    </div>
  );

  const renderPatientProfile = () => (
    <div className="space-y-6">
      <CardHeader>
        <CardTitle>Profil Pasien</CardTitle>
      </CardHeader>
      <CardContent>
        {selectedPatient ? (
          <div className="space-y-0">
            <div className="grid grid-cols-2">
              <p className='text-gray-600 border-b border-r border-gray-200 p-4'><span className='text-gray-400 text-sm'>Nama</span><br /> {selectedPatient.name}</p>
              <p className='text-gray-600 border-b border-gray-200 p-4'><span className='text-gray-400 text-sm'>ID KTP</span><br /> {selectedPatient.idCardNumber}</p>
            </div>
            <div className="grid grid-cols-2">
              <p className='text-gray-600 border-b border-r border-gray-200 p-4 '><span className='text-gray-400 text-sm'>Alamat</span><br /> {`${selectedPatient.address.street}, ${selectedPatient.address.city}, ${selectedPatient.address.state}, ${selectedPatient.address.zipCode}, ${selectedPatient.address.country}`}</p>
              <p className='text-gray-600 border-b border-gray-200 p-4'><span className='text-gray-400 text-sm'>No. Telepon</span><br /> {selectedPatient.phoneNumber}</p>
            </div>

            <div className="grid grid-cols-3">
              <p className='text-gray-600 border-b border-r border-gray-200 p-4 text-center'><span className='text-gray-400 text-sm'>Jenis Kelamin</span><br /> {selectedPatient.gender==='Male'?'Laki-laki':selectedPatient.gender==='Female'?'Perempuan':'-'}</p>
              <p className='text-gray-600 border-b border-r border-gray-200 p-4 text-center'><span className='text-gray-400 text-sm'>Tanggal Lahir</span><br /> {selectedPatient.birthDate}</p>
              <p className='text-gray-600 border-b border-gray-200 p-4 text-center'><span className='text-gray-400 text-sm'>No. KTP</span><br /> {selectedPatient.age}</p>
            </div>
            <div className="grid grid-cols-3">
              <p className='text-gray-600 border-b border-r border-gray-200 p-4 text-center'><span className='text-gray-400 text-sm'>Tinggi</span><br /> {selectedPatient.height} cm</p>
              <p className='text-gray-600 border-b border-r border-gray-200 p-4 text-center'><span className='text-gray-400 text-sm'>Berat</span><br /> {selectedPatient.weight} kg</p>
              <p className='text-gray-600 border-b border-gray-200 p-4 text-center'><span className='text-gray-400 text-sm'>Golongan Darah</span><br /> {selectedPatient.bloodType}</p>
            </div>
            {selectedPatient.handicapped && (
              <p><strong>Kebutuhan Khusus:</strong> {selectedPatient.handicappedDescription}</p>
            )}
          </div>
        ) : (
          <p>Memuat profil pasien...</p>
        )}
        <div className="mt-8 flex justify-between">
          <Button onClick={() => setStep(0)} variant="outline">Kembali</Button>
          <Button onClick={() => setStep(2)} variant="outline">
            Lanjut ke Pemeriksaan Umum <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </div>
  );


  // Simulate IoT device measurement
  const simulateMeasurement = (type: string, duration = 2000) => {
    setLoading(prev => ({ ...prev, [type]: true }));
    setTimeout(() => {
      setMeasurements(prev => ({
        ...prev,
        [type]: getMockReading(type)
      }));
      setLoading(prev => ({ ...prev, [type]: false }));
    }, duration);
  };

  // Mock readings for demonstration
  const getMockReading = (type: string) => {
    const readings = {
      bloodPressure: "145/85",
      temperature: "37.5",
      heartRate: "72",
      oxygenSat: "98",
      retinalScan: "Completed"
    };
    return readings[type as keyof typeof readings];
  };

  const renderVitalSigns = () => (
    <div className="space-y-6">
      <CardHeader>
        <CardTitle>Pemeriksaan Tanda Vital</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-blue-600" />
                <span className='text-gray-600'>Tekanan Darah</span>
              </div>
              {!measurements.bloodPressure ? (
                <Button
                  onClick={() => simulateMeasurement('bloodPressure')}
                  disabled={loading.bloodPressure}
                  className='bg-black text-white hover:bg-gray-500'
                >
                  {loading.bloodPressure ? 'Mengukur...' : 'Mulai'}
                </Button>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="font-bold ml-2">{measurements.bloodPressure} mmHg</span>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              )}
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Thermometer className="w-5 h-5 text-blue-600" />
                <span className='text-gray-600'>Suhu Tubuh</span>
              </div>
              {!measurements.temperature ? (
                <Button
                  onClick={() => simulateMeasurement('temperature')}
                  disabled={loading.temperature}
                  className='bg-black text-white hover:bg-gray-500'
                >
                  {loading.temperature ? 'Mengukur...' : 'Mulai'}
                </Button>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="font-bold ml-2">{measurements.temperature}°C</span>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              )}
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-blue-600" />
                <span className='text-gray-600'>Detak Jantung</span>
              </div>
              {!measurements.heartRate ? (
                <Button
                  onClick={() => simulateMeasurement('heartRate')}
                  disabled={loading.heartRate}
                  className='bg-black text-white hover:bg-gray-500'
                >
                  {loading.heartRate ? 'Mengukur...' : 'Mulai'}
                </Button>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="font-bold ml-2">{measurements.heartRate} bpm</span>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              )}
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Wind className="w-5 h-5 text-blue-600" />
                <span className='text-gray-600'>Saturasi Oksigen</span>
              </div>
              {!measurements.oxygenSat ? (
                <Button
                  onClick={() => simulateMeasurement('oxygenSat')}
                  disabled={loading.oxygenSat}
                  className='bg-black text-white hover:bg-gray-500'
                >
                  {loading.oxygenSat ? 'Mengukur...' : 'Mulai'}
                </Button>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="font-bold ml-2">{measurements.oxygenSat}%</span>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className="mt-6">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-blue-600" />
                <span className='text-gray-600'>Pemindaian Retina</span>
              </div>
              {!measurements.retinalScan ? (
                <Button
                  onClick={() => simulateMeasurement('retinalScan', 3000)}
                  disabled={loading.retinalScan}
                  className='bg-black text-white hover:bg-gray-500'
                >
                  {loading.retinalScan ? 'Memindai...' : 'Mulai Pemindaian'}
                </Button>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="font-bold ml-2">Selesai</span>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className="mt-8">
          <Alert>
            <Timer className="w-5 h-5" />
            <AlertTitle>Estimasi Waktu</AlertTitle>
            <AlertDescription>
              Pemeriksaan ini akan memakan waktu sekitar 10-15 menit
            </AlertDescription>
          </Alert>
        </div>

        <div className="mt-8 flex justify-between">
          <Button variant="outline" onClick={() => setStep(1)}>
            Kembali
          </Button>
          <Button
            onClick={() => setStep(3)}
            disabled={!Object.values(measurements).every(m => m !== null)}
            variant="outline"
          >
            Lanjut ke Kuesioner <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </div>
  );

  const renderQuestionnaire = () => (
    <div className="space-y-6">
      <CardHeader>
        <CardTitle>Kuesioner Kesehatan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <Card className="p-4">
            <MedicalQuestionnaire questions={sampleQuestions} onComplete={handleQuestionnaireComplete} />
          </Card>

        </div>

        <div className="mt-8">
          <Alert>
            <AlertCircle className="w-5 h-5" />
            <AlertTitle>Informasi Privasi</AlertTitle>
            <AlertDescription>
              Data kesehatan Anda akan disimpan secara aman dan hanya dapat diakses oleh tenaga medis yang berwenang
            </AlertDescription>
          </Alert>
        </div>

        <div className="mt-8 flex justify-between">
          <Button variant="outline" onClick={() => setStep(2)}>
            Kembali
          </Button>
          <Button onClick={() => setStep(4)} variant="outline">
            Mulai Konsultasi <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </div>
  );

  const renderTelemedicine = () => (
    <div className="space-y-6">
      <CardHeader>
        <CardTitle>Konsultasi Dokter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <Alert>
            <AlertCircle className="w-5 h-5" />
            <AlertTitle>Menghubungkan ke Dokter</AlertTitle>
            <AlertDescription>
              Mohon tunggu sebentar. Dokter akan terhubung dalam beberapa saat.
            </AlertDescription>
          </Alert>

          <Card className="p-6">
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Timer className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <p>Mempersiapkan panggilan video...</p>
              </div>
            </div>
          </Card>


        </div>

        <div className="mt-8 flex justify-between">
          <Button variant="outline" onClick={() => setStep(3)}>
            Kembali
          </Button>
          <Button variant="destructive">
            Batalkan Konsultasi
          </Button>
        </div>
      </CardContent>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gray-50 p-8">
      <div className='w-full h-80px flex flex-row'>
        <KioskLabel />
      </div>
      <Card className="max-w-3xl mx-auto">
        <div className="p-8">
          <div className="flex justify-between mb-8">
            <div className="flex space-x-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${step >= i ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                />
              ))}
            </div>
            <Timer className="w-5 h-5 text-blue-600" />
          </div>

          {step === 0 && renderPatientLogin()}
          {step === 1 && renderPatientProfile()}
          {step === 2 && renderVitalSigns()}
          {step === 3 && renderQuestionnaire()}
          {step === 4 && renderTelemedicine()}
        </div>
      </Card>
    </div>
  );
};

export default PemeriksaanUmum;