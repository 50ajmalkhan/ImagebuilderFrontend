import React from 'react';
import DownloadIcon from '../common/DownloadIcon';

const VideoGallery = ({ videos }) => {
  const handleDownload = async (video) => {
    try {
      const response = await fetch(video.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `video-${Date.now()}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to download video:', err);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {videos.map((video, index) => (
        <div key={index} className="relative group">
          <video
            src={video.url}
            controls
            className="w-full rounded-lg shadow-md"
            preload="metadata"
          />
          <div className="absolute top-2 right-2">
            <DownloadIcon onClick={() => handleDownload(video)} />
          </div>
          {video.prompt && (
            <p className="mt-2 text-sm text-gray-600 truncate">{video.prompt}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default VideoGallery; 