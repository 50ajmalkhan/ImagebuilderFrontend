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
    <div className="space-y-6">
      <div className="bg-[#252b3d] rounded-lg shadow-lg border border-gray-700 overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {images.map((image, index) => (
              <div key={index} className="group relative">
                <div className="w-full min-h-80 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <img
                    src={image.url}
                    alt={image.prompt}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-300">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {truncateText(image.prompt, 50)}
                    </h3>
                    <p className="mt-1 text-sm text-gray-400">
                      {new Date(image.generated_at || image.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <DownloadIcon onClick={() => handleDownload(image)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
        </div>
      )}

      {error && (
        <div className="rounded-md bg-red-900/50 p-4 border border-red-600">
          <div className="text-sm text-red-200">{error}</div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery; 