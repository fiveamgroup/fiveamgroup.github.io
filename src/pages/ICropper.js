import '../utils/imageCropper.css';  // Import the CSS file here
import React, { useState, useCallback, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../utils/cropImage'; // Utility to handle image cropping
import Header from '../components/Header';
import Footer from '../components/Footer';

function ICropper() {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(null); // Start with null for Freeform
  const [croppedImage, setCroppedImage] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  // Calculate the initial crop area based on the image dimensions
  useEffect(() => {
    if (image) {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        setImageDimensions({ width: img.width, height: img.height });
        setCrop({
          x: 0,
          y: 0,
        });
        setZoom(1);
      };
    }
  }, [image]);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleCrop = async () => {
    try {
      const croppedImg = await getCroppedImg(image, croppedAreaPixels, 0, imageDimensions); //rotation set to 0
      setCroppedImage(croppedImg);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAspectRatioChange = (ratio) => setAspect(ratio);

  return (
    <div className="tool-page omen-theme">
      <Header />
      <div className="content-container">
        <h2>Image Cropper</h2>

        {/* Upload Image Section */}
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload} 
          style={{ display: 'block', margin: '10px 0' }} 
        />

        {image && (
          <>
            {/* Image Cropping Area */}
            <div className="crop-container">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                rotation={0} //rotation set to 0
                aspect={aspect} // If aspect is null, cropping will be freeform
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                style={{
                  width: imageDimensions.width,
                  height: imageDimensions.height,
                }}
              />
            </div>

            {/* Crop Controls */}
            <div className="controls">
              <label>Aspect Ratio:</label>
              <button onClick={() => handleAspectRatioChange(1)}>1:1</button>
              <button onClick={() => handleAspectRatioChange(16 / 9)}>16:9</button>
              <button onClick={() => handleAspectRatioChange(4 / 3)}>4:3</button>
              <button onClick={() => handleAspectRatioChange(null)}>Freeform</button>
            </div>

            {/* Crop Button */}
            <button onClick={handleCrop} className="action-button">Crop Image</button>

            {/* Confirm and Preview Cropped Image */}
            {croppedImage && (
              <div className="preview-section">
                <img src={croppedImage} alt="Cropped" className="preview-image" />
                <a href={croppedImage} download="cropped-image.jpg" className="download-button">Download Cropped Image</a>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ICropper;
