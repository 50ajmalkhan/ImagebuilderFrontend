import React, { useState, useEffect } from 'react';
import { images } from '../../lib/api';
import DownloadIcon from '../common/DownloadIcon';
import { useTranslation } from 'react-i18next';

const ImageGalleryPreview = ({ limit = 8 }) => {
  const { t } = useTranslation();
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDownload = async (image) => {
    try {
      const response = await fetch(image.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `image-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to download image:', err);
    }
  };

  useEffect(() => {
    let mounted = true;

    const fetchImages = async () => {
      if (loading) return; // Prevent multiple simultaneous requests
      
      setLoading(true);
      setError('');

      try {
        const result = await images.list();
        if (mounted) {
          setImageList(result.slice(0, limit));
        }
      } catch (err) {
        if (mounted) {
          setError(err.response?.data?.detail || t('errors.generationFailed'));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchImages();

    return () => {
      mounted = false;
    };
  }, [limit, t]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-900/50 p-4 border border-red-600">
        <div className="text-sm text-red-200">{error}</div>
      </div>
    );
  }

  if (!imageList || imageList.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-200">{t('gallery.noImages.title')}</h3>
        <p className="mt-1 text-sm text-gray-400">{t('gallery.noImages.description')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {imageList.map((image) => (
        <div
          key={image.id}
          className="relative group bg-[#252b3d] rounded-lg shadow-lg border border-gray-700 overflow-hidden"
        >
          <div className="relative aspect-w-16 aspect-h-9">
            <img
              src={image.url}
              alt={image.prompt}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div 
              className="hidden w-full h-full flex items-center justify-center bg-gray-800 text-gray-400 text-sm"
            >
              {t('errors.generationFailed')}
            </div>
            <div className="absolute top-2 right-2 z-10">
              <DownloadIcon 
                onClick={() => handleDownload(image)}
                className="text-white opacity-90 hover:opacity-100"
              />
            </div>
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-300 truncate" title={image.prompt}>
              {image.prompt}
            </p>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-xs text-gray-400">
                {new Date(image.generated_at || image.created_at).toLocaleDateString()}
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                image.status === 'success'
                  ? 'bg-green-900/50 text-green-200'
                  : 'bg-yellow-900/50 text-yellow-200'
              }`}>
                {image.status}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGalleryPreview; 