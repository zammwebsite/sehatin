import React, { useState, useRef, useEffect } from 'react';
import * as blazeface from '@tensorflow-models/blazeface';
import '@tensorflow/tfjs';
import { CameraIcon } from '../components/icons/HeroIcons';

type CheckStatus = 'idle' | 'checking' | 'complete';

interface HealthResult {
  heartRate: number;
  fatigueLevel: 'Low' | 'Medium' | 'High';
}

const HealthCheckPage: React.FC = () => {
  const [status, setStatus] = useState<CheckStatus>('idle');
  const [results, setResults] = useState<HealthResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [model, setModel] = useState<blazeface.BlazeFaceModel | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // 🔹 Load model saat komponen di-mount
  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await blazeface.load();
        setModel(loadedModel);
      } catch (err) {
        console.error('Gagal memuat model BlazeFace:', err);
      }
    };
    loadModel();
  }, []);

  // 🔹 Nyalakan kamera
  const startCamera = async () => {
    setError(null);
    try {
      if (navigator.mediaDevices?.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
      } else {
        setError('Kamera tidak didukung di browser ini.');
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Izin kamera ditolak. Harap izinkan akses kamera di browser Anda.');
    }
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
  };

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const handleStartCheck = async () => {
    if (!streamRef.current || !videoRef.current) {
      setError('Kamera belum siap. Mohon tunggu atau izinkan akses kamera.');
      return;
    }

    setStatus('checking');
    setResults(null);

    try {
      if (model && videoRef.current.readyState >= 2) {
        const predictions = await model.estimateFaces(videoRef.current, false);
        console.log('Prediksi wajah:', predictions);
      }

      // 🔹 Simulasi hasil pemeriksaan
      setTimeout(() => {
        const mockHeartRate = Math.floor(Math.random() * (95 - 65 + 1)) + 65;
        const mockFatigue: 'Low' | 'Medium' | 'High' =
          ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)];
        setResults({ heartRate: mockHeartRate, fatigueLevel: mockFatigue });
        setStatus('complete');
      }, 5000);
    } catch (err) {
      console.error('Error saat mendeteksi wajah:', err);
      setError('Terjadi kesalahan saat memproses gambar.');
      setStatus('idle');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setResults(null);
    if (!streamRef.current) startCamera();
  };

  const renderContent = () => {
    if (error) return <div className="text-center text-red-500">{error}</div>;

    switch (status) {
      case 'checking':
        return (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white z-10 p-4 text-center">
            <div className="w-16 h-16 border-4 border-t-transparent border-primary-400 rounded-full animate-spin mb-4"></div>
            <p className="text-lg font-semibold">Menganalisis... Harap tetap tenang.</p>
            <p className="text-sm">Pastikan wajah Anda terlihat jelas di kamera.</p>
          </div>
        );
      case 'complete':
        return (
          <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center text-white z-10 p-4 text-center">
            <h3 className="text-2xl font-bold mb-4">Pemeriksaan Selesai</h3>
            <div className="grid grid-cols-2 gap-4 text-center w-full max-w-sm">
              <div className="bg-primary-500 p-4 rounded-lg">
                <p className="text-sm">Detak Jantung</p>
                <p className="text-3xl font-bold">{results?.heartRate} bpm</p>
              </div>
              <div className="bg-primary-500 p-4 rounded-lg">
                <p className="text-sm">Tingkat Kelelahan</p>
                <p className="text-xl sm:text-3xl font-bold">{results?.fatigueLevel}</p>
              </div>
            </div>
            <p className="text-xs mt-4 text-gray-300">
              *Hasil ini adalah estimasi dan bukan diagnosis medis.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Cek Kesehatan via Kamera</h2>
      <div className="w-full aspect-video bg-gray-900 rounded-lg overflow-hidden relative flex items-center justify-center">
        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
        {renderContent()}
        {!streamRef.current && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center">
            <CameraIcon className="w-16 h-16 mb-4" />
            <p>Menyalakan kamera...</p>
          </div>
        )}
      </div>
      <div className="mt-6 flex flex-col sm:flex-row justify-center items-center sm:space-x-4 space-y-4 sm:space-y-0">
        <button
          onClick={handleStartCheck}
          disabled={status === 'checking'}
          className="w-full sm:w-auto px-8 py-3 bg-primary-600 text-white font-semibold rounded-lg shadow-md hover:bg-primary-700 disabled:bg-gray-400 transition-all duration-200"
        >
          {status === 'checking' ? 'Memeriksa...' : 'Mulai Pemeriksaan'}
        </button>
        {status === 'complete' && (
          <button
            onClick={handleReset}
            className="w-full sm:w-auto px-8 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition-all duration-200"
          >
            Ulangi
          </button>
        )}
      </div>
    </div>
  );
};

export default HealthCheckPage;
