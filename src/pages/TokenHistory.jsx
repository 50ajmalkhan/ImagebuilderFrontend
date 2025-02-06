import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Image as ImageIcon, Video as VideoIcon, ExternalLink, Coins } from 'lucide-react';
import { tokens } from '../lib/api';

const TokenHistory = () => {
  const { t } = useTranslation();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userTokens = user.tokens || 0;

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch (error) {
      return dateString;
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await tokens.history();
        setHistory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="text-red-500 text-xl mb-4">
          {t('tokenHistory.error')}
        </div>
        <div className="text-gray-500">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">{t('tokenHistory.title')}</h2>
      
      {/* Token Balance Card */}
      <div className="bg-[#252b3d] rounded-lg shadow-lg border border-gray-700 p-4 sm:p-6">
        <div className="flex items-center">
          <div className="p-2 sm:p-3 bg-indigo-900/50 rounded-lg">
            <Coins className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-400" />
          </div>
          <div className="ml-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-200">{t('tokenHistory.currentBalance')}</h3>
            <p className="text-2xl sm:text-3xl font-bold text-indigo-400">{userTokens}</p>
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="bg-[#252b3d] rounded-lg shadow-lg border border-gray-700">
        <div className="p-4 sm:p-6 space-y-4">
          {history.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              {t('tokenHistory.noHistory')}
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className="border border-gray-700 rounded-lg p-3 sm:p-4 hover:bg-[#2a3042] transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    {/* Icon based on action type */}
                    {item.description.toLowerCase().includes('image') ? (
                      <div className="p-2 bg-blue-900/50 rounded-full shrink-0">
                        <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                      </div>
                    ) : (
                      <div className="p-2 bg-purple-900/50 rounded-full shrink-0">
                        <VideoIcon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                      </div>
                    )}
                    
                    <div className="min-w-0">
                      <h4 className="font-medium text-gray-200 truncate">
                        {item.description}
                      </h4>
                      <p className="text-sm text-gray-400 mt-1">
                        {formatDate(item.created_at)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between sm:justify-end space-x-4">
                    <span className={`font-semibold ${
                      item.tokens < 0 ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {item.tokens > 0 ? '+' : ''}{item.tokens}
                    </span>
                    
                    {item.extra_data?.generation_url && (
                      <a
                        href={item.extra_data.generation_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-gray-700 rounded-full transition-colors shrink-0"
                      >
                        <ExternalLink className="w-5 h-5 text-gray-400" />
                      </a>
                    )}
                  </div>
                </div>
                
                {item.extra_data?.prompt && (
                  <div className="mt-3 text-sm text-gray-300 bg-gray-800/50 p-3 rounded">
                    <span className="font-medium">{t('tokenHistory.prompt')}:</span>{' '}
                    <span className="break-words">{item.extra_data.prompt}</span>
                  </div>
                )}
                
                {item.extra_data?.generation_url && (
                  <div className="mt-4">
                    {item.description.toLowerCase().includes('image') ? (
                      <img
                        src={item.extra_data.generation_url}
                        alt={item.extra_data.prompt}
                        className="rounded-lg w-full max-h-48 sm:max-h-64 object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <video
                        src={item.extra_data.generation_url}
                        controls
                        className="rounded-lg w-full max-h-48 sm:max-h-64"
                      />
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenHistory; 