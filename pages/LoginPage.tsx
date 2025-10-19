
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { HeartIcon } from '../components/icons/HeroIcons';
import { Link, useNavigate } from 'react-router-dom';

type FormMode = 'login' | 'register';

const LoginPage: React.FC = () => {
  const [mode, setMode] = useState<FormMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'register' && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Mocking authentication
    console.log(`${mode} attempt with email: ${email}`);
    login(email);
    navigate('/dashboard');
  };

  const activeTabClass = 'border-b-2 border-primary-500 text-primary-500';
  const inactiveTabClass = 'text-gray-500 hover:text-gray-700';

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-100 p-4">
      <div className="relative w-full max-w-md p-6 space-y-8 bg-white rounded-2xl shadow-lg sm:p-8">
        <Link to="/" className="absolute top-4 left-4 text-gray-400 hover:text-gray-600" title="Back to Home">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
        </Link>
        <div className="text-center">
            <HeartIcon className="w-12 h-12 mx-auto text-primary-500"/>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
            {mode === 'login' ? 'Selamat Datang Kembali' : 'Buat Akun Baru'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Mulai perjalanan sehat Anda bersama Sehatin
          </p>
        </div>
        
        <div className="flex border-b border-gray-200">
            <button 
                onClick={() => setMode('login')}
                className={`w-1/2 py-4 text-sm font-medium transition-colors duration-200 ${mode === 'login' ? activeTabClass : inactiveTabClass}`}
            >
                Login
            </button>
            <button 
                onClick={() => setMode('register')}
                className={`w-1/2 py-4 text-sm font-medium transition-colors duration-200 ${mode === 'register' ? activeTabClass : inactiveTabClass}`}
            >
                Register
            </button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full px-3 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Alamat Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full px-3 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {mode === 'register' && (
              <div>
                <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  required
                  className="relative block w-full px-3 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                  placeholder="Konfirmasi Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div>
            <button
              type="submit"
              className="group relative flex justify-center w-full px-4 py-3 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {mode === 'login' ? 'Login' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
