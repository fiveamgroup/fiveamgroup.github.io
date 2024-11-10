import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Add this line
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles.css';
import Resizer from './pages/Resizer';
import Compressor from './pages/Compressor';
import Converter from './pages/Converter';
import Homepage from './components/Homepage';

function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/resizer" element={<Resizer />} />
        <Route path="/compressor" element={<Compressor />} />
        <Route path="/converter" element={<Converter />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
