import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Add this line
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './styles.css';
import Header from './components/Header';
import Banner from './components/Banner';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Banner />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
