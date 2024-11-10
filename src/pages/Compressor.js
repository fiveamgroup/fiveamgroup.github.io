// Compressor.js
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import imageCompression from 'browser-image-compression';

function Compressor() {
  const [image, setImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // New state for image preview

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      
      // Create a preview of the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file); // Read file as a data URL
    }
  };

  const handleCompress = async () => {
    if (image) {
      try {
        const options = { maxSizeMB: 1, maxWidthOrHeight: 1024, useWebWorker: true };
        const compressedFile = await imageCompression(image, options);
        const compressedImageURL = URL.createObjectURL(compressedFile);
        setCompressedImage(compressedImageURL);
      } catch (error) {
        console.error('Compression failed:', error);
      }
    }
  };

  return (
    <div className="tool-page omen-theme">
      <Header />
      <div className="content-container">
        <h2>Image Compressor</h2>
        
        <label htmlFor="file-upload" className="file-label">Upload Image</label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />

        {/* Show image preview if an image is uploaded */}
        {imagePreview && (
          <div className="image-preview-container">
            <h4>Image Preview</h4>
            <img src={imagePreview} alt="Uploaded" className="preview-image" />
          </div>
        )}

        <button className="action-button" onClick={handleCompress}>Compress Image</button>

        {compressedImage && (
          <>
            <img src={compressedImage} alt="Compressed" className="preview-image" />
            <a href={compressedImage} download="compressed-image.jpg" className="download-button">
              Download Compressed Image
            </a>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Compressor;
