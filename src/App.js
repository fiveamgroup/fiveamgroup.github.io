import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

const Homepage = () => (
  <div className="min-h-screen bg-gray-100">
    <div className="container mx-auto text-center py-12">
      <h1 className="text-4xl font-bold">Welcome to 5am Group Games</h1>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Link to="/game1" className="p-4 bg-blue-500 text-white rounded shadow-lg hover:bg-blue-600">Game 1</Link>
        <Link to="/game2" className="p-4 bg-green-500 text-white rounded shadow-lg hover:bg-green-600">Game 2</Link>
        <Link to="/game3" className="p-4 bg-red-500 text-white rounded shadow-lg hover:bg-red-600">Game 3</Link>
      </div>
    </div>
  </div>
);

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Homepage />} />
      {/* Add additional game routes here */}
    </Routes>
  </Router>
);

export default App;
