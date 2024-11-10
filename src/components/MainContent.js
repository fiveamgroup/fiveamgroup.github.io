import React from 'react';
import { Link } from 'react-router-dom';

function MainContent() {
  return (
    <div className="container mt-5 pt-5">
      <h2 className="text-center mb-4">Our Web Tools</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Image Resizer</h5>
              <p className="card-text">Resize your images to custom dimensions.</p>
              <Link to="/resizer" className="btn btn-primary">Go to Resizer</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Image Compressor</h5>
              <p className="card-text">Compress images to reduce file size.</p>
              <Link to="/compressor" className="btn btn-primary">Go to Compressor</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Image Converter</h5>
              <p className="card-text">Convert images to different formats.</p>
              <Link to="/converter" className="btn btn-primary">Go to Converter</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Image Cropper</h5>
              <p className="card-text">Crop images [coming soon] </p>
              <Link to="/" className="btn btn-primary">Go to Cropper</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainContent;
