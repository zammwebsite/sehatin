
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserCircleIcon, ArrowLeftOnRectangleIcon, Bars3Icon } from './icons/HeroIcons';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/chat':
        return 'AI Asisten Medis';
      case '/checkup':
        return 'Cek Kesehatan';
      case '/history':
        return 'Riwayat Pemeriksaan';
      default:
        return 'Sehatin';
    }
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
      <div className="flex items-center">
        <button onClick={onMenuClick} className="md:hidden mr-4 text-gray-600 hover:text-primary-600">
          <Bars3Icon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">{getTitle()}</h1>
      </div>
      <div className="flex items-center space-x-2 md:space-x-4">
        <div className="flex items-center space-x-2">
          <UserCircleIcon className="w-8 h-8 text-gray-500" />
          <div className="text-right hidden sm:block">
            <p className="font-semibold text-sm text-gray-700">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="p-2 rounded-full text-gray-500 hover:bg-red-100 hover:text-red-600 transition-colors duration-200"
          title="Logout"
        >
          <ArrowLeftOnRectangleIcon className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;
