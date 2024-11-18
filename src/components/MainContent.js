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
              <p className="card-text">Resize your images to custom dimensions</p>
              <Link to="/resizer" className="btn btn-primary">Go to Resizer</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Image Compressor</h5>
              <p className="card-text">Compress images to reduce file size</p>
              <Link to="/compressor" className="btn btn-primary">Go to Compressor</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Image Converter</h5>
              <p className="card-text">Convert images to different formats</p>
              <Link to="/converter" className="btn btn-primary">Go to Converter</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Image Cropper</h5>
              <p className="card-text">Crop images to custom dimensions </p>
              <Link to="/icropper" className="btn btn-primary">Go to Cropper</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Image Exif Viewer</h5>
              <p className="card-text">View image EXIF data </p>
              <Link to="/exifviewer" className="btn btn-primary">Go to Exif Viewer</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Image Color Picker</h5>
              <p className="card-text">Pick image colors [coming soon] </p>
              <Link to="/colorpicker" className="btn btn-primary">Go to Color Picker</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4"> 
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Image Editor</h5>
              <p className="card-text">Edit your images with various tools.</p>
              <Link to="/imageeditor" className="btn btn-primary">Go to Image Editor</Link>
            </div>
          </div>
        </div>
        {/* 
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Video To Gif</h5>
              <p className="card-text">Convert videos to gifs.</p>
              <Link to="/video-to-gif" className="btn btn-primary">Go to Video To Gif</Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">MP4 to MP3 Converter</h5>
              <p className="card-text">Convert MP4 files to MP3 audio.</p>
              <Link to="/mp4-to-mp3" className="btn btn-primary">Go to Converter</Link>
            </div>
          </div>
        </div>
        */}
      </div>
    </div>
  );
}

export default MainContent;
