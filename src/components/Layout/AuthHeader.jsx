import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../common/LanguageSelector';

const AuthHeader = () => {
  const { t } = useTranslation();

  return (
    <header className="bg-gray-800 border-b border-gray-700 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition-colors duration-200">
                <svg
                  className="w-6 h-6 text-white"
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
              <span className="ml-2 text-xl font-bold text-white hover:text-gray-200 transition-colors duration-200">
                {t('common.appName')}
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSelector />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default AuthHeader; 