'use client'

import React, { useState } from 'react';
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

const PemeriksaanUmum = () => {
  const [step, setStep] = useState(0);
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
      bloodPressure: "120/80",
      temperature: "36.5",
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
                <span>Tekanan Darah</span>
              </div>
              {!measurements.bloodPressure ? (
                <Button 
                  onClick={() => simulateMeasurement('bloodPressure')}
                  disabled={loading.bloodPressure}
                  className='bg-blue-600 text-white hover:bg-green-500'
                >
                  {loading.bloodPressure ? 'Mengukur...' : 'Mulai'}
                </Button>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="font-bold">{measurements.bloodPressure} mmHg</span>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              )}
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Thermometer className="w-5 h-5 text-blue-600" />
                <span>Suhu Tubuh</span>
              </div>
              {!measurements.temperature ? (
                <Button 
                  onClick={() => simulateMeasurement('temperature')}
                  disabled={loading.temperature}
                  className='bg-blue-600 text-white hover:bg-green-500'
                >
                  {loading.temperature ? 'Mengukur...' : 'Mulai'}
                </Button>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="font-bold">{measurements.temperature}°C</span>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              )}
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-blue-600" />
                <span>Detak Jantung</span>
              </div>
              {!measurements.heartRate ? (
                <Button 
                  onClick={() => simulateMeasurement('heartRate')}
                  disabled={loading.heartRate}
                  className='bg-blue-600 text-white hover:bg-green-500'
                >
                  {loading.heartRate ? 'Mengukur...' : 'Mulai'}
                </Button>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="font-bold">{measurements.heartRate} bpm</span>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              )}
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Wind className="w-5 h-5 text-blue-600" />
                <span>Saturasi Oksigen</span>
              </div>
              {!measurements.oxygenSat ? (
                <Button 
                  onClick={() => simulateMeasurement('oxygenSat')}
                  disabled={loading.oxygenSat}
                  className='bg-blue-600 text-white hover:bg-green-500'
                >
                  {loading.oxygenSat ? 'Mengukur...' : 'Mulai'}
                </Button>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="font-bold">{measurements.oxygenSat}%</span>
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
                <span>Pemindaian Retina</span>
              </div>
              {!measurements.retinalScan ? (
                <Button 
                  onClick={() => simulateMeasurement('retinalScan', 3000)}
                  disabled={loading.retinalScan}
                  className='bg-blue-600 text-white hover:bg-green-500'
                >
                  {loading.retinalScan ? 'Memindai...' : 'Mulai Pemindaian'}
                </Button>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="font-bold">Selesai</span>
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
          <Button variant="outline" onClick={() => setStep(0)}>
            Kembali
          </Button>
          <Button 
            onClick={() => setStep(1)}
            disabled={!Object.values(measurements).every(m => m !== null)}
            className='bg-blue-600 text-white hover:bg-green-500'
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
            <div className="space-y-4">
              <h3 className="font-semibold">Riwayat Kesehatan</h3>
              <div className="space-y-2">
                <label className="block">
                  Apakah Anda memiliki riwayat penyakit kronis?
                </label>
                <div className="flex space-x-4">
                  <Button variant="outline" className='bg-blue-600 text-white hover:bg-green-500'>Ya</Button>
                  <Button variant="outline" className='bg-blue-600 text-white hover:bg-green-500'>Tidak</Button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block">
                  Apakah Anda sedang mengkonsumsi obat-obatan?
                </label>
                <div className="flex space-x-4">
                  <Button variant="outline" className='bg-blue-600 text-white hover:bg-green-500'>Ya</Button>
                  <Button variant="outline" className='bg-blue-600 text-white hover:bg-green-500'>Tidak</Button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="space-y-4">
              <h3 className="font-semibold">Gejala Saat Ini</h3>
              <div className="space-y-2">
                <label className="block">
                  Apakah Anda mengalami gejala berikut? (pilih semua yang sesuai)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className='bg-blue-600 text-white hover:bg-green-500'>Demam</Button>
                  <Button variant="outline" className='bg-blue-600 text-white hover:bg-green-500'>Batuk</Button>
                  <Button variant="outline" className='bg-blue-600 text-white hover:bg-green-500'>Sakit Kepala</Button>
                  <Button variant="outline" className='bg-blue-600 text-white hover:bg-green-500'>Nyeri Sendi</Button>
                </div>
              </div>
            </div>
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
          <Button variant="outline" onClick={() => setStep(0)}>
            Kembali
          </Button>
          <Button onClick={() => setStep(2)} className='bg-blue-600 text-white hover:bg-green-500'>
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

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-2">Detail Dokter</h3>
              <p>Dr. Siti Rahmah</p>
              <p className="text-sm text-gray-600">Dokter Umum</p>
            </Card>
            <Card className="p-4">
              <h3 className="font-semibold mb-2">Estimasi Waktu</h3>
              <p>5-10 menit</p>
              <p className="text-sm text-gray-600">Waktu tunggu</p>
            </Card>
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <Button variant="outline" onClick={() => setStep(1)}>
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
    <div className="min-h-screen bg-gray-50 p-8">
      <Card className="max-w-3xl mx-auto">
        <div className="p-8">
          <div className="flex justify-between mb-8">
            <div className="flex space-x-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    step >= i ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <Timer className="w-5 h-5 text-blue-600" />
          </div>

          {step === 0 && renderVitalSigns()}
          {step === 1 && renderQuestionnaire()}
          {step === 2 && renderTelemedicine()}
        </div>
      </Card>
    </div>
  );
};

export default PemeriksaanUmum;