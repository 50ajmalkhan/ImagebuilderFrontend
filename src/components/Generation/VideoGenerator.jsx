import React, { useState } from 'react';
import { videos } from '../../lib/api';
import { useTranslation } from 'react-i18next';
import DownloadIcon from '../common/DownloadIcon';
import { tokens } from '../../lib/api';

const VideoGenerator = () => {
  const { t } = useTranslation();
  const [prompt, setPrompt] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedVideo, setGeneratedVideo] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        setError(t('videoGeneration.errors.invalidImageType'));
        return;
      }
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError(t('videoGeneration.errors.imageTooLarge'));
        return;
      }
      setSelectedImage(file);
      setError(''); // Clear any previous errors
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setGeneratedVideo(null);

    try {
      const result = await videos.generate({ 
        prompt, 
        image: selectedImage 
      });
      setGeneratedVideo(result);
      
      // Update token balance
      await tokens.getBalance();
    } catch (err) {
      setError(err.response?.data?.detail || t('videoGeneration.errors.generationFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!generatedVideo?.url) return;
    
    try {
      const response = await fetch(generatedVideo.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `generated-video-${Date.now()}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(t('videoGeneration.errors.downloadFailed'));
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
        {t('videoGeneration.title')}
      </h2>
      <div className="max-w-4xl mx-auto p-6 bg-[#252b3d] rounded-lg shadow-lg border border-gray-700">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-md bg-red-900/50 p-4 border border-red-600">
              <div className="text-sm text-red-200">{error}</div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              {t('videoGeneration.prompt')}
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
              className="w-full px-3 py-2 bg-[#1a1f2e] border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400"
              rows="3"
              placeholder={t('videoGeneration.promptPlaceholder')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              {t('videoGeneration.image')}
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md bg-[#1a1f2e]">
              <div className="space-y-1 text-center">
                {!selectedImage ? (
                  <>
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-400">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium text-indigo-400 hover:text-indigo-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>{t('videoGeneration.uploadImage')}</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                      <p className="pl-1">{t('videoGeneration.dragAndDrop')}</p>
                    </div>
                    <p className="text-xs text-gray-400">{t('videoGeneration.imageRequirements')}</p>
                  </>
                ) : (
                  <div className="relative">
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Selected"
                      className="max-h-48 rounded"
                    />
                    <button
                      type="button"
                      onClick={() => setSelectedImage(null)}
                      className="absolute -top-2 -right-2 rounded-full bg-red-600 text-white p-1 hover:bg-red-700 focus:outline-none"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || !selectedImage || !prompt.trim()}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('videoGeneration.generating')}
                </div>
              ) : (
                t('videoGeneration.generate')
              )}
            </button>
          </div>
        </form>

        {generatedVideo && (
          <div className="mt-8">
            <div className="relative group">
              <video
                src={generatedVideo.url}
                controls
                className="rounded-lg shadow-lg w-full"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x600?text=Video+Generation+Failed';
                }}
              />
              <div className="absolute top-4 right-4">
                <DownloadIcon onClick={handleDownload} />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-300">{generatedVideo.prompt}</p>
              <p className="text-xs text-gray-400 mt-1">
                Generated on {new Date(generatedVideo.generated_at || generatedVideo.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoGenerator; 