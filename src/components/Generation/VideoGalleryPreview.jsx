import React, { useState, useEffect } from 'react';
import { videos } from '../../lib/api';
import DownloadIcon from '../common/DownloadIcon';

const VideoGalleryPreview = ({ limit = 4 }) => {
  const [videoList, setVideoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  useEffect(() => {
    let mounted = true;

    const fetchVideos = async () => {
      setLoading(true);
      setError('');

      try {
        const result = await videos.list();
        if (mounted) {
          setVideoList(result.slice(0, limit));
        }
      } catch (err) {
        if (mounted) {
          setError(err.response?.data?.detail || 'Failed to fetch videos');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchVideos();

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

  if (videoList.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-sm text-gray-500">No videos yet. Start by generating your first video.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {videoList.map((video) => (
        <div
          key={video.id}
          className="relative group bg-white rounded-lg shadow-sm overflow-hidden"
        >
          <div className="relative aspect-w-16 aspect-h-9">
            <video
              controls
              className="w-full h-full object-cover"
              src={video.url}
              poster={video.reference_image_url}
            >
              Your browser does not support the video tag.
            </video>
            <div className="absolute top-2 right-2 z-10">
              <DownloadIcon 
                onClick={() => handleDownload(video)}
                className="opacity-90 hover:opacity-100"
              />
            </div>
          </div>
          <div className="p-2">
            <p className="text-sm text-gray-600 truncate" title={video.prompt}>
              {video.prompt}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoGalleryPreview; 