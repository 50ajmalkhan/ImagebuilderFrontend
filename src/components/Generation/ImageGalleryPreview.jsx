import React, { useState, useEffect } from 'react';
import { images } from '../../lib/api';
import DownloadIcon from '../common/DownloadIcon';

const ImageGalleryPreview = ({ limit = 8 }) => {
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
      setLoading(true);
      setError('');

      try {
        const result = await images.list();
        if (mounted) {
          setImageList(result.slice(0, limit));
        }
      } catch (err) {
        if (mounted) {
          setError(err.response?.data?.detail || 'Failed to fetch images');
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
  }, [limit]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="text-sm text-red-700">{error}</div>
      </div>
    );
  }

  if (imageList.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-sm text-gray-500">No images yet. Start by generating your first image.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {imageList.map((image) => (
        <div
          key={image.id}
          className="relative group bg-white rounded-lg shadow-sm overflow-hidden"
        >
          <div className="relative aspect-w-16 aspect-h-9">
            <img
              src={image.url}
              alt={image.prompt}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
              }}
            />
            <div className="absolute top-2 right-2 z-10">
              <DownloadIcon 
                onClick={() => handleDownload(image)}
                className="opacity-90 hover:opacity-100"
              />
            </div>
          </div>
          <div className="p-2">
            <p className="text-sm text-gray-600 truncate" title={image.prompt}>
              {image.prompt}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGalleryPreview; 