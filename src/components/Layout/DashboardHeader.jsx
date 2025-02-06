import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSelector from '../common/LanguageSelector';
import { Coins } from 'lucide-react';

const DashboardHeader = () => {
  const { t } = useTranslation();
  const [tokens, setTokens] = useState(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.tokens || 0;
  });

  useEffect(() => {
    const handleTokenUpdate = (event) => {
      setTokens(event.detail.balance);
    };

    window.addEventListener('tokenBalanceUpdated', handleTokenUpdate);

    return () => {
      window.removeEventListener('tokenBalanceUpdated', handleTokenUpdate);
    };
  }, []);

  return (
    <header className="fixed top-0 z-40 w-full bg-[#252b3d] border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="ml-2 text-xl font-bold text-indigo-400">VidGen</span>
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 px-3 py-1 bg-indigo-900/50 rounded-lg border border-indigo-700">
              <Coins className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-medium text-indigo-300">{tokens}</span>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader; 