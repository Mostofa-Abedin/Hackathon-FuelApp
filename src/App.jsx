import './App.css';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import { StationProvider } from './context/StationContext.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import './styles/MapComponent.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <StationProvider>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer position="top-center" />
    </StationProvider>
  );
}

export default App;
