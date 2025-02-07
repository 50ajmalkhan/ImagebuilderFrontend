import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginForm from './components/Auth/LoginForm';
import SignupPage from './pages/SignupPage';
import ImageGenerator from './components/Generation/ImageGenerator';
import ImageGallery from './components/Generation/ImageGallery';
import VideoGenerator from './components/Generation/VideoGenerator';
import VideoGallery from './components/Generation/VideoGallery';
import ImageGalleryPreview from './components/Generation/ImageGalleryPreview';
import VideoGalleryPreview from './components/Generation/VideoGalleryPreview';
import DashboardLayout from './components/Layout/DashboardLayout';
import Header from './components/Layout/Header';
import DashboardHeader from './components/Layout/DashboardHeader';
import EmailVerificationPage from './pages/EmailVerificationPage';
import TokenHistory from './pages/TokenHistory';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import { useTranslation } from 'react-i18next';

// Protected Route Component
const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Dashboard Home Content
const DashboardContent = () => {
  const { t } = useTranslation();
  
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">{t('dashboard.title')}</h1>
        
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">{t('dashboard.quickActions.title')}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link
              to="/generate/image"
              className="relative rounded-lg border border-gray-700 bg-[#1a1f2e] px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-indigo-500 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-white">
                  {t('dashboard.quickActions.generateImage.title')}
                </p>
                <p className="text-sm text-gray-400">
                  {t('dashboard.quickActions.generateImage.description')}
                </p>
              </div>
            </Link>

            <Link
              to="/generate/video"
              className="relative rounded-lg border border-gray-700 bg-[#1a1f2e] px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-indigo-500 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-white">
                  {t('dashboard.quickActions.generateVideo.title')}
                </p>
                <p className="text-sm text-gray-400">
                  {t('dashboard.quickActions.generateVideo.description')}
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Content */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">{t('dashboard.recentImages')}</h2>
            <ImageGallery limit={4} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">{t('dashboard.recentVideos')}</h2>
            <VideoGallery limit={4} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Content with Routes
const AppContent = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#1a1f2e]">
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verify-email" element={<EmailVerificationPage />} />

          {/* Protected Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <DashboardContent />
                </DashboardLayout>
              </PrivateRoute>
            }
          />

          {/* Protected Generation Routes */}
          <Route
            path="/generate/image"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <div className="py-6">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <ImageGenerator />
                    </div>
                  </div>
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/generate/video"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <div className="py-6">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <VideoGenerator />
                    </div>
                  </div>
                </DashboardLayout>
              </PrivateRoute>
            }
          />

          {/* Protected Gallery Routes */}
          <Route
            path="/gallery/images"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <div className="py-6">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <ImageGallery />
                    </div>
                  </div>
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/gallery/videos"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <div className="py-6">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <VideoGallery />
                    </div>
                  </div>
                </DashboardLayout>
              </PrivateRoute>
            }
          />

          {/* Protected Account Routes */}
          <Route
            path="/token-history"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <div className="py-6">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <TokenHistory />
                    </div>
                  </div>
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/payment/success"
            element={
              <PrivateRoute>
                <PaymentSuccessPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;