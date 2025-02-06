import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader, RefreshCw } from 'lucide-react';
import GenericHeader from '../components/common/GenericHeader';
import { auth } from '../lib/api';
import { useTranslation } from 'react-i18next';

const EmailVerificationPage = () => {
  const [verificationStatus, setVerificationStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = new URLSearchParams(location.search).get('token');
        if (!token) {
          setVerificationStatus('error');
          setMessage(t('errors.verificationErrors.invalidToken'));
          return;
        }

        try {
          const response = await auth.verifyEmail(token);
          setVerificationStatus('success');
          setMessage(t('auth.verificationSuccess'));
          
          // If we received a token, redirect to dashboard
          if (response.access_token) {
            setMessage(t('auth.redirectingToDashboard'));
            setTimeout(() => {
              navigate('/dashboard');
            }, 2000);
          } else {
            // Store success message in session storage for landing page
            sessionStorage.setItem('verificationSuccess', 'true');
            // Redirect to landing page after 5 seconds
            setTimeout(() => {
              navigate('/');
            }, 5000);
          }
        } catch (error) {
          setVerificationStatus('error');
          if (error.response?.data?.detail?.[0]?.type === 'missing') {
            setMessage(t('errors.verificationErrors.invalidToken'));
          } else if (error.response?.status === 400) {
            setMessage(t('errors.verificationErrors.invalidToken'));
          } else if (error.response?.status === 404) {
            setMessage(t('errors.verificationErrors.expired'));
          } else if (error.response?.status === 409) {
            setMessage(t('errors.verificationErrors.alreadyVerified'));
            setTimeout(() => {
              navigate('/');
            }, 3000);
          } else {
            setMessage(t('errors.verificationErrors.generic'));
            console.error('Verification error:', error.response?.data);
          }
          setEmail(error.response?.data?.email || '');
        }
      } catch (error) {
        setVerificationStatus('error');
        setMessage(t('errors.verificationErrors.invalidToken'));
      }
    };

    verifyEmail();
  }, [location, navigate, t]);

  const handleResendVerification = async () => {
    if (!email) {
      setMessage(t('errors.verificationErrors.unableToResend'));
      return;
    }

    setResendLoading(true);
    try {
      await auth.resendVerification(email);
      setResendSuccess(true);
      setMessage(t('auth.verifyEmailSent'));
    } catch (error) {
      if (error.response?.status === 429) {
        setMessage(t('errors.verificationErrors.resendLimit'));
      } else {
        setMessage(t('errors.verificationErrors.resendFailed'));
      }
    } finally {
      setResendLoading(false);
    }
  };

  const renderContent = () => {
    switch (verificationStatus) {
      case 'verifying':
        return (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block"
            >
              <Loader className="w-16 h-16 text-indigo-500 animate-spin" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-2xl font-bold text-white"
            >
              {t('auth.verifyingEmail')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-2 text-gray-400"
            >
              {t('auth.verifyingEmailWait')}
            </motion.p>
          </div>
        );

      case 'success':
        return (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block"
            >
              <CheckCircle className="w-16 h-16 text-green-500" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-2xl font-bold text-white"
            >
              {t('auth.verificationSuccess')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-2 text-gray-400"
            >
              {message}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-4 text-indigo-400"
            >
              {t('auth.redirectingToLanding')}
            </motion.p>
          </div>
        );

      case 'error':
        return (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block"
            >
              <XCircle className="w-16 h-16 text-red-500" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-2xl font-bold text-white"
            >
              {t('auth.verificationFailed')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-2 text-gray-400"
            >
              {message}
            </motion.p>
            {email && !resendSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6"
              >
                <button
                  onClick={handleResendVerification}
                  disabled={resendLoading}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {resendLoading ? (
                    <>
                      <RefreshCw className="animate-spin -ml-1 mr-2 h-4 w-4" />
                      {t('common.sending')}
                    </>
                  ) : (
                    t('auth.resendVerification')
                  )}
                </button>
              </motion.div>
            )}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6"
            >
              <Link
                to="/"
                className="text-indigo-400 hover:text-indigo-300 font-medium"
              >
                {t('auth.returnToLanding')}
              </Link>
            </motion.div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1f2e] to-[#252b3d]">
      <GenericHeader />
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full space-y-8 bg-[#1e2335] p-8 rounded-xl border border-gray-700 shadow-2xl"
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default EmailVerificationPage; 