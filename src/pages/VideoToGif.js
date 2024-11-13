import React, { useState, useRef } from 'react';
import Gifshot from 'gifshot';

function VideoToGif() {
  const [videoFile, setVideoFile] = useState(null);
  const [gifPreview, setGifPreview] = useState(null);
  const [gifData, setGifData] = useState(null);
  const [converting, setConverting] = useState(false);
  const videoRef = useRef(null);

  const handleVideoInputChange = (event) => {
    const file = event.target.files[0];
    setVideoFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      videoRef.current.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const convertToGif = () => {
    setConverting(true);

    Gifshot.createGIF({
      video: [videoRef.current.src],
      gifWidth: 320,
      gifHeight: 240,
      numFrames: 10,
    }, (obj) => {
      if (!obj.error) {
        const image = obj.image;
        setGifPreview(image);
        setGifData(image);
        setConverting(false);
      } else {
        console.error('Error creating GIF:', obj.errorMsg);
        setConverting(false);
      }
    });
  };

  const downloadGif = () => {
    const link = document.createElement('a');
    link.href = gifData;
    link.download = 'output.gif';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="video-to-gif-container flex flex-col items-center justify-center h-screen">
      <h1 className="mb-4 text-2xl font-bold">Video to GIF Converter</h1>
      <label htmlFor="videoInput" className="file-label mb-4">
        Upload Video
        <input
          type="file"
          id="videoInput"
          accept="video/*"
          onChange={handleVideoInputChange}
          className="block p-2 bg-gray-800 text-white border-none cursor-pointer"
        />
      </label>
      {videoFile && (
        <video ref={videoRef} width="600" height="400" controls className="mb-4">
          Your browser does not support the video tag.
        </video>
      )}
      <button
        onClick={convertToGif}
        disabled={!videoFile || converting}
        className="mb-4 px-4 py-2 bg-gray-800 text-white border-none cursor-pointer"
      >
        {converting ? 'Converting...' : 'Convert to GIF'}
      </button>
      {gifPreview && (
        <div className="gif-preview mb-4">
          <img src={gifPreview} alt="GIF Preview" />
        </div>
      )}
      <button
        id="downloadBtn"
        onClick={downloadGif}
        disabled={!gifData}
        className="px-4 py-2 bg-gray-800 text-white border-none cursor-pointer"
      >
        Download GIF
      </button>
    </div>
  );
}

export default VideoToGif;
