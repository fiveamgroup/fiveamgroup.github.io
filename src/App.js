import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Add this line
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles.css';
import Resizer from './pages/Resizer';
import Compressor from './pages/Compressor';
import Converter from './pages/Converter';
import ICropper from './pages/ICropper';
import Homepage from './components/Homepage';
import ExifViewer from './pages/ExifViewer';

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
      </Routes>
    </div>
  </Router>
  );
}

export default App;
