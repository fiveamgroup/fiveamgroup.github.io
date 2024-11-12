// ColorPicker.js
import React, { useState, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ColorPicker() {
  const [image, setImage] = useState(null);
  const [color, setColor] = useState(null);
  const [zoom, setZoom] = useState(1); // State for zoom level
  const imageRef = useRef(null);

  // Handle image upload and reset state
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setColor(null);
      setZoom(1); // Reset zoom when a new image is uploaded
    }
  };

  // Convert RGB to HEX
  const rgbToHex = (r, g, b) => {
    const hex = (x) => x.toString(16).padStart(2, '0');
    return `#${hex(r)}${hex(g)}${hex(b)}`;
  };

  // Handle click to pick color
  const handleImageClick = (e) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = imageRef.current;

    // Adjust the canvas size to match the original image
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

    // Calculate coordinates for color picking based on zoom
    const rect = img.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (img.naturalWidth / rect.width);
    const y = (e.clientY - rect.top) * (img.naturalHeight / rect.height);

    const { data } = ctx.getImageData(x, y, 1, 1);
    const [r, g, b] = data;
    const hex = rgbToHex(r, g, b);

    setColor({ rgb: `rgb(${r}, ${g}, ${b})`, hex });
  };

  return (
    <div className="color-picker-page">
      <Header />
      <div className="content-container">
        <h2>Image Color Picker</h2>

        {/* Image Upload Section */}
        <label htmlFor="file-upload" className="file-label">Upload Image</label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />

        {/* Zoom Slider */}
        {image && (
          <div className="zoom-container">
            <label htmlFor="zoom-slider" className="zoom-label">Zoom:</label>
            <input
              type="range"
              id="zoom-slider"
              min="1"
              max="3"
              step="0.1"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="zoom-slider"
            />
          </div>
        )}

        {/* Image Preview with Zoom and Click Event */}
        {image && (
          <div className="image-container">
            <img
              src={image}
              alt="Preview"
              className="image-preview"
              ref={imageRef}
              onClick={handleImageClick}
              style={{ transform: `scale(${zoom})` }} // Apply zoom
            />
          </div>
        )}

        {/* Display Selected Color */}
        {color && (
          <div className="color-info">
            <div
              className="color-box"
              style={{ backgroundColor: color.hex }}
            ></div>
            <p><strong>HEX:</strong> {color.hex}</p>
            <p><strong>RGB:</strong> {color.rgb}</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ColorPicker;
