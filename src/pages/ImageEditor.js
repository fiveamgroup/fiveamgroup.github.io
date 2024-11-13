import React, { useState, useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

function ImageEditor() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [saturation, setSaturation] = useState(1);
  const [contrast, setContrast] = useState(1);
  const [brightness, setBrightness] = useState(1);
  const [filter, setFilter] = useState(null);
  const cropperRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleRotate = () => {
    setRotation((prevRotation) => (prevRotation + 90) % 360);
    if (cropperRef.current  && cropperRef.current.cropper) {
      cropperRef.current.cropper.rotate(90); // Use cropper.rotate
    }
  };

  const handleCrop = () => {
    if (cropperRef.current && cropperRef.current.cropper) {
      setCroppedImage(cropperRef.current.cropper.getCroppedCanvas().toDataURL());
    }
  };

  const handleDownload = () => {
    if (croppedImage) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = croppedImage;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.filter = getFilterStyle().filter || 'none'; // Apply filters
        ctx.drawImage(img, 0, 0);
        const link = document.createElement('a');
        link.href = canvas.toDataURL();
        link.download = 'cropped_image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
    }
  };

  const handleSaturationChange = (event) => {
    setSaturation(parseFloat(event.target.value));
  };

  const handleContrastChange = (event) => {
    setContrast(parseFloat(event.target.value));
  };

  const handleBrightnessChange = (event) => {
    setBrightness(parseFloat(event.target.value));
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const getFilterStyle = () => {
    switch (filter) {
      case 'grayscale':
        return { filter: 'grayscale(1)' };
      case 'sepia':
        return { filter: 'sepia(1)' };
      case 'invert':
        return { filter: 'invert(1)' };
      case 'blur':
        return { filter: 'blur(5px)' };
      case 'sharpen':
        return { filter: 'sharpen(2)' };
      case 'vintage':
        return { filter: 'sepia(0.5) contrast(1.2) brightness(0.9)' };
      default:
        return {};
    }
  };

  return (
    <div className="tool-page">
      <div className="content-container">
        <h2>Image Editor</h2>
        <input type="file" id="imageUpload" onChange={handleImageChange} />
        <label htmlFor="imageUpload" className="file-label">Choose Image</label>

        {selectedImage && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '400px', marginTop: '20px' }}>
              <Cropper
                src={selectedImage}
                style={{ height: '100%', width: '100%', maxWidth: '500px' }}
                initialAspectRatio={1}
                guides={true}
                rotatable={true}
                ref={cropperRef}
                viewMode={1}
                background={false}
                autoCropArea={1}
                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              />
            </div>

            <div style={{ marginTop: '20px' }}>
              <button className="action-button" onClick={handleRotate}>
                Rotate 90°
              </button>
              <button className="action-button" onClick={handleCrop}>
                Crop
              </button>
              <button className="action-button" onClick={handleDownload}>
                Download
              </button>

              <button className="action-button" onClick={() => handleFilterChange('grayscale')}>
                Grayscale
              </button>
              <button className="action-button" onClick={() => handleFilterChange('sepia')}>
                Sepia
              </button>
              <button className="action-button" onClick={() => handleFilterChange('invert')}>
                Invert
              </button>
              <button className="action-button" onClick={() => handleFilterChange('blur')}>
                Blur
              </button>
              <button className="action-button" onClick={() => handleFilterChange('sharpen')}>
                Sharpen
              </button>
              <button className="action-button" onClick={() => handleFilterChange('vintage')}>
                Vintage
              </button>
              <button className="action-button" onClick={() => handleFilterChange(null)}>
                None
              </button>
            </div>

            <div style={{ marginTop: '20px' }}>
              <label htmlFor="saturation" className="format-label">
                Saturation:
              </label>
              <input
                type="range"
                id="saturation"
                min="0"
                max="2"
                step="0.1"
                value={saturation}
                onChange={handleSaturationChange}
                className="dimension-input"
              />
            </div>

            <div style={{ marginTop: '20px' }}>
              <label htmlFor="contrast" className="format-label">
                Contrast:
              </label>
              <input
                type="range"
                id="contrast"
                min="0"
                max="2"
                step="0.1"
                value={contrast}
                onChange={handleContrastChange}
                className="dimension-input"
              />
            </div>

            <div style={{ marginTop: '20px' }}>
              <label htmlFor="brightness" className="format-label">
                Brightness:
              </label>
              <input
                type="range"
                id="brightness"
                min="0"
                max="2"
                step="0.1"
                value={brightness}
                onChange={handleBrightnessChange}
                className="dimension-input"
              />
            </div>

            {croppedImage && (
              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <h3 style={{ textAlign: 'center' }}>Cropped Image:</h3>
                <img
                  src={croppedImage}
                  alt="Cropped"
                  className="preview-image"
                  style={getFilterStyle()}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageEditor;
