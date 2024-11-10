import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Resizer() {
  const [image, setImage] = useState(null);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [resizedImage, setResizedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // New state for image preview
  const [originalWidth, setOriginalWidth] = useState(null); // Store original width
  const [originalHeight, setOriginalHeight] = useState(null); // Store original height

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set image preview
        const img = new Image();
        img.onload = () => {
          setOriginalWidth(img.width); // Set original image width
          setOriginalHeight(img.height); // Set original image height
          setWidth(img.width); // Set width input to original image width
          setHeight(img.height); // Set height input to original image height
        };
        img.src = reader.result; // Trigger image load
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResize = () => {
    if (image && width && height) {
      const img = new Image();
      img.src = imagePreview;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const resizedImageURL = canvas.toDataURL('image/jpeg');
        setResizedImage(resizedImageURL);
      };
    }
  };

  return (
    <div className="tool-page omen-theme">
      <Header />
      <div className="content-container">
        <h2>Image Resizer</h2>
        
        <label htmlFor="file-upload" className="file-label">Upload Image</label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        
        {imagePreview && (
          <div className="image-preview-container">
            <img src={imagePreview} alt="Uploaded Image" className="preview-image" />
          </div>
        )}
        
        <div className="dimension-input-container">
          <input
            type="number"
            className="dimension-input"
            placeholder="Width"
            value={width}
            onChange={(e) => setWidth(parseInt(e.target.value))}
            min="1"
            max={originalWidth}
          />
          <input
            type="number"
            className="dimension-input"
            placeholder="Height"
            value={height}
            onChange={(e) => setHeight(parseInt(e.target.value))}
            min="1"
            max={originalHeight}
          />
        </div>

        <button className="action-button" onClick={handleResize}>Resize Image</button>

        {resizedImage && (
          <>
            <img src={resizedImage} alt="Resized" className="preview-image" />
            <a href={resizedImage} download="resized-image.jpg" className="download-button">
              Download Resized Image
            </a>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Resizer;
