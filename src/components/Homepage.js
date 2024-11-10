import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Add this line
import '../styles.css';
import Header from './Header';
import Banner from './Banner';
import MainContent from './MainContent';
import Footer from './Footer';

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