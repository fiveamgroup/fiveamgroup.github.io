import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles.css';
import Resizer from './pages/Resizer';
import Compressor from './pages/Compressor';
import Converter from './pages/Converter';
import ICropper from './pages/ImageCropper';
import Homepage from './components/Homepage';
import ExifViewer from './pages/ExifViewer';
import ColorPicker from './pages/ColorPicker';
import ImageEditor from './pages/ImageEditor'; 
import VideoToGif from './pages/VideoToGif';
import Mp4ToMp3 from './pages/Mp4ToMp3';
import QrCode from './pages/QrCode';

function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/resizer" element={<Resizer />} />
        <Route path="/compressor" element={<Compressor />} />
        <Route path="/converter" element={<Converter />} />
        <Route path="/icropper" element={<ICropper />} />
        <Route path="/exifviewer" element={<ExifViewer />} />
        <Route path="/colorpicker" element={<ColorPicker />} />
        <Route path="/imageeditor" element={<ImageEditor />} /> 
        <Route path="/video-to-gif" element={<VideoToGif />} />
        <Route path="/mp4-to-mp3" element={<Mp4ToMp3 />} />
        <Route path="/qrcode" element={<QrCode />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
