import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle, RefreshCw, CreditCard, Home } from 'lucide-react';
import { tokens } from '../lib/api';
import DashboardLayout from '../components/Layout/DashboardLayout';

export const PaymentSuccessPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const sessionId = params.get('session_id');

        if (!sessionId) {
          setError(t('payment.error.no_session'));
          setVerifying(false);
          return;
        }

        // Verify payment with backend
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/subscription/verify/${sessionId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        const data = await response.json();
        
        if (data.status === 'success') {
          // Refresh token balance and update local storage
          await tokens.getBalance();
          setVerifying(false);
        } else {
          throw new Error(data.message || t('payment.error.generic'));
        }
      } catch (err) {
        console.error('Payment verification error:', err);
        setError(err.message || t('payment.error.generic'));
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [location.search, t]);

  const content = () => {
    if (verifying) {
      return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
          <div className="max-w-md w-full">
            <div className="bg-[#252b3d] rounded-xl shadow-lg p-8 text-center border border-gray-700">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent mx-auto"></div>
              <h2 className="mt-4 text-xl font-semibold text-white">
                {t('payment.verifying')}
              </h2>
              <p className="mt-2 text-gray-400">
                {t('payment.please_wait')}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
          <div className="max-w-md w-full">
            <div className="bg-[#252b3d] rounded-xl shadow-lg p-8 text-center border border-gray-700">
              <div className="w-12 h-12 rounded-full bg-red-900/20 mx-auto flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-red-400" />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-white">
                {t('payment.verification_failed')}
              </h2>
              <p className="mt-2 text-gray-400">
                {error}
              </p>
              <div className="mt-6">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Home className="h-4 w-4 mr-2" />
                  {t('common.returnToHome')}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-[#252b3d] rounded-xl shadow-lg p-8 text-center border border-gray-700">
            <div className="w-16 h-16 rounded-full bg-green-900/20 mx-auto flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
            
            <h2 className="mt-6 text-2xl font-bold text-white">
              {t('payment.success_title')}
            </h2>
            
            <p className="mt-3 text-lg text-gray-400">
              {t('payment.success_description')}
            </p>

            <div className="mt-8 p-4 bg-[#1a1f2e] rounded-lg border border-gray-700">
              <div className="flex items-center justify-center gap-2 text-lg font-medium text-white">
                <RefreshCw className="h-5 w-5 text-indigo-400" />
                <span>{t('payment.tokens_updated')}</span>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => navigate('/dashboard')}
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                <Home className="h-5 w-5 mr-2" />
                {t('common.returnToHome')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout>
      {content()}
    </DashboardLayout>
  );
};

export default PaymentSuccessPage; 