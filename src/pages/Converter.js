import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Converter() {
  const [image, setImage] = useState(null);
  const [convertedImage, setConvertedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [outputFormat, setOutputFormat] = useState('jpeg'); // Default format

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConvert = () => {
    if (image) {
      const img = new Image();
      img.src = URL.createObjectURL(image);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        // Convert the image to the selected format
        let convertedData;
        if (outputFormat === 'jpeg') {
          convertedData = canvas.toDataURL('image/jpeg');
        } else if (outputFormat === 'png') {
          convertedData = canvas.toDataURL('image/png');
        } else if (outputFormat === 'webp') {
          convertedData = canvas.toDataURL('image/webp');
        }

        setConvertedImage(convertedData);
      };
    }
  };

  return (
    <div className="tool-page omen-theme">
      <Header />
      <div className="content-container">
        <h2>Image Converter</h2>

        <label htmlFor="file-upload" className="file-label">Upload Image</label>
        <input
          id="file-upload"
          type="file"
          accept="image/*" // Accept only image files
          onChange={handleImageUpload}
          className="file-upload-input"
        />

        {imagePreview && (
          <div className="image-preview-container">
            <img src={imagePreview} alt="Uploaded file" className="preview-image" />
          </div>
        )}

        <div className="output-format-container">
          <label htmlFor="output-format" className="format-label">Choose Output Format:</label>
          <select
            id="output-format"
            value={outputFormat}
            onChange={(e) => setOutputFormat(e.target.value)}
            className="format-dropdown"
          >
            <option value="jpeg">JPEG</option>
            <option value="png">PNG</option>
            <option value="webp">WebP</option>
          </select>
        </div>

        <button className="action-button" onClick={handleConvert}>Convert Image</button>

        {convertedImage && (
          <>
            <img src={convertedImage} alt="Converted" className="preview-image" />
            <a href={convertedImage} download={`converted-image.${outputFormat}`} className="download-button">Download Converted Image</a>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Converter;
