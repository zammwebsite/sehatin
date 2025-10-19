
import React from 'react';
import { Link } from 'react-router-dom';
import { ChartBarIcon, ChatBubbleLeftRightIcon, CameraIcon, HeartIcon } from '../components/icons/HeroIcons';

const LandingPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      <header className="absolute top-0 left-0 right-0 z-10 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <HeartIcon className="h-8 w-8 text-primary-500" />
            <h1 className="text-2xl font-bold ml-2 text-slate-800">Sehatin</h1>
          </div>
          <Link
            to="/login"
            className="px-4 py-2 text-sm font-semibold text-white transition-all duration-300 rounded-lg shadow-md bg-primary-500 sm:px-6 sm:text-base hover:bg-primary-600"
          >
            Login / Register
          </Link>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center text-center bg-primary-50 overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
          <div className="relative z-10 p-4">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-secondary-900 mb-4 tracking-tight">
              Asisten Kesehatan Pribadi Anda
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-slate-600 mb-8">
              Lakukan pengecekan kesehatan mandiri, konsultasi cepat dengan AI, dan pantau perkembangan Anda, semuanya di satu tempat.
            </p>
            <Link
              to="/login"
              className="inline-block px-8 py-3 font-bold text-white transition-all duration-300 transform rounded-full shadow-lg bg-primary-500 sm:px-10 sm:py-4 hover:bg-primary-600 hover:scale-105"
            >
              Mulai Cek Kesehatan
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h3 className="text-3xl font-bold text-secondary-900 mb-4">Fitur Unggulan</h3>
            <p className="text-slate-600 mb-12 max-w-2xl mx-auto">
              Sehatin dirancang dengan teknologi modern untuk memberikan pengalaman yang edukatif dan bermanfaat bagi kesehatan Anda.
            </p>
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              <div className="p-8 rounded-xl bg-slate-50 border border-slate-200">
                <div className="inline-block p-4 bg-primary-100 text-primary-600 rounded-full mb-4">
                   <ChatBubbleLeftRightIcon className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-semibold text-secondary-900 mb-2">AI Asisten Medis</h4>
                <p className="text-slate-500">
                  Tanyakan gejala, pola tidur, atau nutrisi. Dapatkan jawaban cepat dan edukatif dari AI canggih kami.
                </p>
              </div>
              <div className="p-8 rounded-xl bg-slate-50 border border-slate-200">
                 <div className="inline-block p-4 bg-primary-100 text-primary-600 rounded-full mb-4">
                    <CameraIcon className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-semibold text-secondary-900 mb-2">Cek Kesehatan via Kamera</h4>
                <p className="text-slate-500">
                  Gunakan kamera perangkat Anda untuk mengukur detak jantung atau mengenali tanda-tanda kelelahan secara instan.
                </p>
              </div>
              <div className="p-8 rounded-xl bg-slate-50 border border-slate-200">
                 <div className="inline-block p-4 bg-primary-100 text-primary-600 rounded-full mb-4">
                    <ChartBarIcon className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-semibold text-secondary-900 mb-2">Dashboard Kesehatan</h4>
                <p className="text-slate-500">
                  Visualisasikan data kesehatan Anda dengan grafik interaktif dan pantau kemajuan Anda dari waktu ke waktu.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

       <footer className="bg-secondary-900 text-white py-8">
            <div className="container mx-auto text-center">
                <p>&copy; 2024 Sehatin. All rights reserved.</p>
            </div>
        </footer>
    </div>
  );
};

export default LandingPage;
