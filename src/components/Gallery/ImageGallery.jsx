import React from 'react';
import DownloadIcon from '../common/DownloadIcon';

const ImageGallery = ({ images }) => {
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

  if (!images || images.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No images found in the gallery.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {images.map((image, index) => (
        <div key={index} className="relative group bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative aspect-square">
            <img
              src={image.url}
              alt={image.prompt || 'Generated image'}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 z-10">
              <DownloadIcon 
                onClick={() => handleDownload(image)}
                className="opacity-90 hover:opacity-100"
              />
            </div>
          </div>
          {image.prompt && (
            <div className="p-3 border-t">
              <p className="text-sm text-gray-600 truncate">{image.prompt}</p>
              {image.created_at && (
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(image.created_at).toLocaleString()}
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageGallery; 