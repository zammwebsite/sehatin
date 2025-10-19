
import React from 'react';
import HealthChart from '../components/HealthChart';
import { HeartIcon } from '../components/icons/HeroIcons';
import { useAuth } from '../hooks/useAuth';

const mockHealthData = [
  { date: '01 Jul', heartRate: 72 },
  { date: '02 Jul', heartRate: 75 },
  { date: '03 Jul', heartRate: 70 },
  { date: '04 Jul', heartRate: 78 },
  { date: '05 Jul', heartRate: 74 },
  { date: '06 Jul', heartRate: 76 },
  { date: '07 Jul', heartRate: 80 },
];

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">Selamat datang, {user?.name}!</h2>
        <p className="mt-1 text-gray-500">Berikut adalah ringkasan kesehatan Anda.</p>
      </div>

      {/* Health Metrics Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white rounded-xl shadow-md flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Detak Jantung</p>
            <p className="text-3xl font-bold text-gray-800">80 <span className="text-lg font-normal">bpm</span></p>
          </div>
          <div className="p-3 bg-red-100 rounded-full">
            <HeartIcon className="w-6 h-6 text-red-500" />
          </div>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-md">
            <p className="text-sm font-medium text-gray-500">Tekanan Darah</p>
            <p className="text-3xl font-bold text-gray-800">120/80</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-md">
            <p className="text-sm font-medium text-gray-500">Suhu Tubuh</p>
            <p className="text-3xl font-bold text-gray-800">36.5°C</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-md">
            <p className="text-sm font-medium text-gray-500">Berat Badan</p>
            <p className="text-3xl font-bold text-gray-800">68 <span className="text-lg font-normal">kg</span></p>
        </div>
      </div>

      {/* Health Trends Chart */}
      <div className="p-6 bg-white rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Tren Detak Jantung (7 Hari Terakhir)</h3>
        <HealthChart data={mockHealthData} metric="heartRate" color="#ef4444" />
      </div>
    </div>
  );
};

export default DashboardPage;
