import React, { useState, useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ImageCropper() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(1); 
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

  const handleCrop = () => {
    if (cropperRef.current && cropperRef.current.cropper) {
      const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas({
        aspectRatio: aspectRatio === 'freeform' ? NaN : aspectRatio, 
      });
      setCroppedImage(croppedCanvas.toDataURL());
    }
  };

  const handleAspectRatioChange = (ratio) => {
    setAspectRatio(ratio);
  };

  const handleDownload = () => {
    if (croppedImage) {
      const link = document.createElement('a');
      link.href = croppedImage;
      link.download = 'cropped_image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="tool-page">
      <Header />
      <div className="content-container">
        <h2>Image Cropper</h2>
        <input type="file" id="imageUpload" onChange={handleImageChange} />
        <label htmlFor="imageUpload" className="file-label">
          Choose Image
        </label>

        {selectedImage && (
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '400px',
                marginTop: '20px',
              }}
            >
              <Cropper
                src={selectedImage}
                style={{ height: '100%', width: '100%', maxWidth: '500px' }}
                initialAspectRatio={aspectRatio}
                guides={true}
                rotatable={true}
                ref={cropperRef}
                viewMode={1}
                background={false}
                autoCropArea={1}
                checkOrientation={false} 
              />
            </div>

            <div style={{ marginTop: '20px' }}>
              <button
                className="action-button"
                onClick={() => handleAspectRatioChange(1)}
              >
                1:1
              </button>
              <button
                className="action-button"
                onClick={() => handleAspectRatioChange(4 / 3)}
              >
                4:3
              </button>
              <button
                className="action-button"
                onClick={() => handleAspectRatioChange(16 / 9)}
              >
                16:9
              </button>
              <button
                className="action-button"
                onClick={() => handleAspectRatioChange('freeform')}
              >
                Freeform
              </button>
              <button className="action-button" onClick={handleCrop}>
                Crop
              </button>
              <button className="action-button" onClick={handleDownload}>
                Download
              </button>
            </div>

            {croppedImage && (
              <div
                style={{
                  marginTop: '20px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <h3 style={{ textAlign: 'center' }}>Cropped Image:</h3>
                <img src={croppedImage} alt="Cropped" className="preview-image" />
                <button className="action-button" onClick={handleDownload}>
                  Download
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ImageCropper;
