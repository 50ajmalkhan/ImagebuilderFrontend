import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Mail } from 'lucide-react';
import GenericHeader from '../components/common/GenericHeader';
import TextField from '../components/common/TextField';
import { auth } from '../lib/api';

const SignupPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError(t('errors.auth.nameRequired'));
      return false;
    }
    if (!formData.email.trim()) {
      setError(t('errors.auth.emailRequired'));
      return false;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      setError(t('errors.auth.invalidEmail'));
      return false;
    }
    if (formData.password.length < 8) {
      setError(t('errors.auth.passwordLength'));
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError(t('errors.auth.passwordMismatch'));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await auth.signup(formData);
      setSignupSuccess(true);
    } catch (err) {
      if (err.response?.status === 409) {
        setError(t('errors.auth.emailExists'));
      } else if (err.response?.status === 400) {
        setError(err.response.data.detail || t('errors.auth.invalidInput'));
      } else {
        setError(err.response?.data?.detail || t('errors.auth.signupFailed'));
      }
    } finally {
      setLoading(false);
    }
  };

  if (signupSuccess) {
    return (
      <div className="bg-[#1a1f2e] min-h-screen">
        <GenericHeader />
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full space-y-8 bg-[#252b3d] p-8 rounded-xl border border-gray-700 shadow-2xl"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-500/10 mb-4"
              >
                <Mail className="h-8 w-8 text-indigo-400" />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-bold text-white mb-2"
              >
                {t('auth.verifyEmail')}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 mb-6"
              >
                {t('auth.verifyEmailSent')} <span className="text-indigo-400">{formData.email}</span>
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-sm text-gray-400 bg-[#1a1f2e] p-4 rounded-lg border border-gray-700"
              >
                <p className="mb-2">✓ {t('auth.verifyEmailInstructions.check')}</p>
                <p className="mb-2">✓ {t('auth.verifyEmailInstructions.expiry')}</p>
                <p>✓ {t('auth.verifyEmailInstructions.spam')}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8"
              >
                <Link
                  to="/login"
                  className="text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  {t('common.returnToLogin')}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1f2e] min-h-screen">
      <GenericHeader />
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-white mb-2">
              {t('auth.createAccount')}
            </h2>
            <h3 className="text-xl font-semibold text-indigo-400 mb-4">
              {t('auth.getStarted')}
            </h3>
            <p className="text-gray-300">
              {t('auth.haveAccount')} {' '}
              <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
                {t('auth.login')}
              </Link>
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#252b3d] rounded-xl border border-gray-700 shadow-xl p-8"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-md bg-red-900/50 border border-red-600 p-4"
                >
                  <div className="flex">
                    <XCircle className="h-5 w-5 text-red-400" />
                    <p className="ml-3 text-sm text-red-200">{error}</p>
                  </div>
                </motion.div>
              )}
              <div className="space-y-4">
                <TextField
                  label={t('auth.name')}
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder={t('auth.name')}
                  value={formData.name}
                  onChange={handleChange}
                />
                <TextField
                  label={t('auth.email')}
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder={t('auth.email')}
                  value={formData.email}
                  onChange={handleChange}
                />
                <TextField
                  label={t('auth.password')}
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder={t('auth.password')}
                  value={formData.password}
                  onChange={handleChange}
                />
                <TextField
                  label={t('auth.confirmPassword')}
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  placeholder={t('auth.confirmPassword')}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    t('auth.signUp')
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;