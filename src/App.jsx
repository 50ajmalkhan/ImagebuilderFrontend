import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginForm from './components/Auth/LoginForm';
import SignupPage from './pages/SignupPage';
import ImageGenerator from './components/Generation/ImageGenerator';
import ImageGallery from './components/Generation/ImageGallery';
import VideoGenerator from './components/Generation/VideoGenerator';
import VideoGallery from './components/Generation/VideoGallery';
import DashboardLayout from './components/Layout/DashboardLayout';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const DashboardContent = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate mb-6">
          Dashboard
        </h2>
      </div>

      {/* Recent Images Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Images</h3>
            <Link
              to="/gallery/images"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              View all
            </Link>
          </div>
        </div>
        <div className="px-4 py-5 sm:p-6" style={{ maxHeight: '500px', overflowY: 'auto' }}>
          <ImageGallery limit={8} />
        </div>
      </div>

      {/* Recent Videos Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Videos</h3>
            <Link
              to="/gallery/videos"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              View all
            </Link>
          </div>
        </div>
        <div className="px-4 py-5 sm:p-6" style={{ maxHeight: '500px', overflowY: 'auto' }}>
          <VideoGallery limit={4} />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link
              to="/generate/image"
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-indigo-500 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">Generate New Image</p>
                <p className="text-sm text-gray-500">Create AI-powered images from text descriptions</p>
              </div>
            </Link>

            <Link
              to="/generate/video"
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-indigo-500 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">Generate New Video</p>
                <p className="text-sm text-gray-500">Create AI-powered videos from images and text</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected routes */}
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
        <Route
          path="/generate/image"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <div className="space-y-6">
                  <div className="md:flex md:items-center md:justify-between">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        Generate New Image
                      </h2>
                    </div>
                  </div>
                  <ImageGenerator />
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
                <div className="space-y-6">
                  <div className="md:flex md:items-center md:justify-between">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        Generate New Video
                      </h2>
                    </div>
                  </div>
                  <VideoGenerator />
                </div>
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/gallery/images"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <div className="space-y-6">
                  <div className="md:flex md:items-center md:justify-between">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        Image Gallery
                      </h2>
                    </div>
                  </div>
                  <ImageGallery />
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
                <div className="space-y-6">
                  <div className="md:flex md:items-center md:justify-between">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        Video Gallery
                      </h2>
                    </div>
                  </div>
                  <VideoGallery />
                </div>
              </DashboardLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;