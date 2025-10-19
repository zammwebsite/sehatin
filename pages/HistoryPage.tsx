
import React from 'react';
import { HealthData } from '../types';

const mockHistoryData: HealthData[] = [
  { id: '1', date: '2024-07-21 10:30', heartRate: 75, bloodPressure: '122/81', bodyTemp: 36.7, fatigueLevel: 'Low' },
  { id: '2', date: '2024-07-20 09:00', heartRate: 82, bloodPressure: '125/85', bodyTemp: 36.9, fatigueLevel: 'Medium' },
  { id: '3', date: '2024-07-19 15:45', heartRate: 70, bloodPressure: '118/78', bodyTemp: 36.5, fatigueLevel: 'Low' },
  { id: '4', date: '2024-07-18 08:15', heartRate: 88, bloodPressure: '130/88', bodyTemp: 37.1, fatigueLevel: 'High' },
  { id: '5', date: '2024-07-17 20:00', heartRate: 68, bloodPressure: '120/80', bodyTemp: 36.6, fatigueLevel: 'Low' },
];

const HistoryPage: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Riwayat Pemeriksaan Kesehatan</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal & Waktu</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detak Jantung (bpm)</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tekanan Darah</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Suhu Tubuh (°C)</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tingkat Kelelahan</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockHistoryData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.heartRate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.bloodPressure}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.bodyTemp}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                   <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                     item.fatigueLevel === 'Low' ? 'bg-green-100 text-green-800' :
                     item.fatigueLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                     'bg-red-100 text-red-800'
                   }`}>
                      {item.fatigueLevel}
                   </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryPage;
