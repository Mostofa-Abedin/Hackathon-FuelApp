import './App.css';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import { StationProvider } from './context/StationContext.jsx'; // Import StationContext

function App() {
  return (
    <StationProvider> {/* Wrap the application in StationProvider */}
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </StationProvider>
  );
}

export default App;
