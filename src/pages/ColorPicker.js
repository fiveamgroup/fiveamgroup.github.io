import React, { useState, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ColorPicker() {
  const [image, setImage] = useState(null);
  const [color, setColor] = useState(null);
  const [zoom, setZoom] = useState(1);
  const imageRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setColor(null);
      setZoom(1);
    }
  };

  const rgbToHex = (r, g, b) => {
    const hex = (x) => x.toString(16).padStart(2, '0');
    return `#${hex(r)}${hex(g)}${hex(b)}`;
  };

  const handleImageClick = (e) => {
    if (!imageRef.current) return; // Handle case where image is not loaded

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = imageRef.current;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;

    const pixelX = Math.floor(x * (img.naturalWidth / rect.width));
    const pixelY = Math.floor(y * (img.naturalHeight / rect.height));

    if (pixelX >= 0 && pixelX < img.naturalWidth && pixelY >= 0 && pixelY < img.naturalHeight) {
        const { data } = ctx.getImageData(pixelX, pixelY, 1, 1);
        const [r, g, b] = data;
        const hex = rgbToHex(r, g, b);
        setColor({ rgb: `rgb(${r}, ${g}, ${b})`, hex });
    } else {
        setColor(null); // Handle clicks outside the image
        console.log("Click outside image");
    }
  };

  return (
    <div className="color-picker-page">
      <Header />
      <div className="content-container">
        <h2>Image Color Picker</h2>
        <label htmlFor="file-upload" className="file-label">Upload Image</label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
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
        {image && (
          <div className="image-container">
            <img
              src={image}
              alt="Preview"
              className="image-preview"
              ref={imageRef}
              onClick={handleImageClick}
              style={{ transform: `scale(${zoom})` }}
            />
          </div>
        )}
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
