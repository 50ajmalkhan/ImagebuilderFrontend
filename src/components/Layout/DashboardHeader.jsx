import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSelector from '../common/LanguageSelector';
import { Coins, CreditCard } from 'lucide-react';

const DashboardHeader = () => {
  const { t } = useTranslation();

  return (
    <header className="fixed top-0 z-40 w-full bg-[#252b3d] border-b border-gray-700 lg:pl-64">
      <div className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo and App Name */}
        <div className="flex items-center">
          <Link to="/dashboard" className="flex items-center">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition-colors duration-200">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span className="ml-2 text-lg font-semibold text-white hidden sm:block">
              {t('common.appName')}
            </span>
          </Link>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          {/* Purchase Tokens Button */}
          <Link
            to="/payment"
            className="inline-flex items-center px-3 py-1.5 border border-indigo-500 rounded-md text-sm font-medium text-indigo-400 hover:bg-indigo-500 hover:text-white transition-colors duration-200"
          >
            <Coins className="w-4 h-4 mr-1.5" />
            <span>{t('common.purchaseTokens')}</span>
          </Link>

          {/* Language Selector */}
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader; 