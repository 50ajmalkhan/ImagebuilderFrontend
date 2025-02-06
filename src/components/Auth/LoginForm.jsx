import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';
import GenericHeader from '../common/GenericHeader';
import TextField from '../common/TextField';
import { auth } from '../../lib/api';

const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await auth.login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Invalid email or password');
      } else if (err.response?.status === 403) {
        setError('Please verify your email before logging in');
      } else {
        setError(err.response?.data?.detail || 'Failed to login. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1a1f2e] min-h-screen">
      <GenericHeader />
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-white mb-2">
              {t('auth.login')}
            </h2>
            <p className="text-gray-300">
              {t('auth.noAccount')} {' '}
              <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-medium">
                {t('auth.signUp')}
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
                    t('auth.login')
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

export default LoginForm; 