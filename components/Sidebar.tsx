
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChartBarIcon, ChatBubbleLeftRightIcon, CameraIcon, DocumentTextIcon, HeartIcon, XMarkIcon } from './icons/HeroIcons';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-4 py-3 text-lg font-medium rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-primary-600 text-white shadow-md'
        : 'text-gray-200 hover:bg-primary-700 hover:text-white'
    }`;

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-30 flex h-full w-64 transform flex-col bg-secondary-900 text-white transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-primary-700 px-4">
          <div className="flex items-center">
            <HeartIcon className="h-8 w-8 text-primary-400" />
            <h1 className="ml-2 text-2xl font-bold">Sehatin</h1>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-1 text-gray-300 hover:text-white md:hidden" aria-label="Close sidebar">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex-1 space-y-4 px-4 py-6">
          <NavLink to="/dashboard" className={navLinkClasses} onClick={() => setIsOpen(false)}>
            <ChartBarIcon className="mr-3 h-6 w-6" />
            Dashboard
          </NavLink>
          <NavLink to="/chat" className={navLinkClasses} onClick={() => setIsOpen(false)}>
            <ChatBubbleLeftRightIcon className="mr-3 h-6 w-6" />
            AI Chat
          </NavLink>
          <NavLink to="/checkup" className={navLinkClasses} onClick={() => setIsOpen(false)}>
            <CameraIcon className="mr-3 h-6 w-6" />
            Cek Kesehatan
          </NavLink>
          <NavLink to="/history" className={navLinkClasses} onClick={() => setIsOpen(false)}>
            <DocumentTextIcon className="mr-3 h-6 w-6" />
            Riwayat
          </NavLink>
        </nav>
        <div className="border-t border-primary-700 p-4 text-center text-xs text-gray-400">
          &copy; 2024 Sehatin
        </div>
      </div>
    </>
  );
};

export default Sidebar;
