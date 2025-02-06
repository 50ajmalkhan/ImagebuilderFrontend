import React, { useState } from 'react';
import { images } from '../../lib/api';
import DownloadIcon from '../common/DownloadIcon';
import { useTranslation } from 'react-i18next';
import api from '../../lib/api';

const ImageGenerator = () => {
  const { t } = useTranslation();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setGeneratedImage(null);

    try {
      const result = await images.generate({ prompt });
      setGeneratedImage(result);
      
      // Update token balance
      const balanceResponse = await api.get('/tokens/balance');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      user.tokens = balanceResponse.data.tokens;
      localStorage.setItem('user', JSON.stringify(user));
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to generate image');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(generatedImage.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `generated-image-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('Failed to download image');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#252b3d] rounded-lg shadow-lg border border-gray-700">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-md bg-red-900/50 p-4 border border-red-600">
            <div className="text-sm text-red-200">{error}</div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            {t('imageGeneration.prompt')}
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
            className="w-full px-3 py-2 bg-[#1a1f2e] border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400"
            rows="3"
            placeholder={t('imageGeneration.promptPlaceholder')}
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('imageGeneration.generating')}
              </div>
            ) : (
              t('imageGeneration.generate')
            )}
          </button>
        </div>
      </form>

      {generatedImage && (
        <div className="mt-8">
          <div className="relative group">
            <img
              src={generatedImage.url}
              alt={generatedImage.prompt}
              className="rounded-lg shadow-lg w-full object-contain max-h-[600px]"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x600?text=Image+Generation+Failed';
              }}
            />
            <div className="absolute top-4 right-4">
              <DownloadIcon onClick={handleDownload} />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-300">{generatedImage.prompt}</p>
            <p className="text-xs text-gray-400 mt-1">
              Generated on {new Date(generatedImage.generated_at || generatedImage.created_at).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGenerator; 