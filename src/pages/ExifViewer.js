// ExifViewerRemover.js
import React, { useState } from 'react';
import EXIF from 'exif-js';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExifViewer() {
  const [image, setImage] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [cleanedImage, setCleanedImage] = useState(null);

  // Function to read EXIF data
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      EXIF.getData(file, function () {
        const allMetadata = EXIF.getAllTags(this);
        setMetadata(allMetadata);
      });
    }
  };

  // Function to remove EXIF data
  const removeExifData = () => {
    if (!image) return;

    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      // Convert canvas to a new image URL without EXIF metadata
      const cleanedURL = canvas.toDataURL('image/jpeg');
      setCleanedImage(cleanedURL);
    };
  };

  return (
    <div className="exif-viewer-remover-page">
      <Header />
      <div className="content-container">
        <h2>Image EXIF Metadata Viewer and Remover</h2>

        {/* Image Upload Section */}
        <label htmlFor="file-upload" className="file-label">Upload Image</label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />

        {/* Image Preview and Metadata */}
        {image && (
          <>
            <img src={image} alt="Preview" className="preview-image" />
            <h3>EXIF Metadata:</h3>
            <pre className="metadata-display">
              {metadata ? JSON.stringify(metadata, null, 2) : "No EXIF metadata found."}
            </pre>
          </>
        )}

        {/* Remove EXIF Data */}
        {image && (
          <button className="action-button" onClick={removeExifData}>
            Remove EXIF Metadata
          </button>
        )}

        {/* Display Cleaned Image */}
        {cleanedImage && (
          <>
            <h3>Cleaned Image:</h3>
            <img src={cleanedImage} alt="Cleaned" className="preview-image" />
            <a href={cleanedImage} download="cleaned-image.jpg" className="download-button">
              Download Cleaned Image
            </a>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ExifViewer