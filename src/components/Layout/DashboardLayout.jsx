import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../../lib/api';
import { useTranslation } from 'react-i18next';
import DashboardHeader from './DashboardHeader';
import { Menu, X, LogOut, History, Home, Image, Video, Grid, Film } from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    {
      name: t('dashboard.menu.home'),
      href: '/dashboard',
      icon: <Home className="w-6 h-6" />
    },
    {
      name: t('dashboard.menu.generateImage'),
      href: '/generate/image',
      icon: <Image className="w-6 h-6" />
    },
    {
      name: t('dashboard.menu.generateVideo'),
      href: '/generate/video',
      icon: <Video className="w-6 h-6" />
    },
    {
      name: t('dashboard.menu.imageGallery'),
      href: '/gallery/images',
      icon: <Grid className="w-6 h-6" />
    },
    {
      name: t('dashboard.menu.videoGallery'),
      href: '/gallery/videos',
      icon: <Film className="w-6 h-6" />
    },
    {
      name: t('dashboard.menu.tokenHistory'),
      href: '/token-history',
      icon: <History className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1f2e]">
      <DashboardHeader />
      
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-45 w-64 bg-[#252b3d] border-r border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          <div className="flex-1 flex flex-col pt-20 pb-4 overflow-y-auto">
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    location.pathname === item.href
                      ? 'bg-[#1a1f2e] text-white'
                      : 'text-gray-300 hover:bg-[#1a1f2e] hover:text-white'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150`}
                >
                  <div className="mr-3 flex-shrink-0">{item.icon}</div>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          {/* Logout button */}
          <div className="p-4 border-t border-gray-700">
            <button
              onClick={() => {
                auth.logout();
                navigate('/');
              }}
              className="w-full flex items-center px-2 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-[#1a1f2e] rounded-md transition-colors duration-150"
            >
              <LogOut className="mr-3 h-6 w-6" />
              {t('auth.logout')}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;