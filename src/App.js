import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './views/Home';
import axios from 'axios'

function App() {
  return (
    <Router>
    <div className="App">
      <div>
      <Header 
        title=""
      />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      <Footer />          
      </div>
    </div>      
  </Router> 
  );
}

export default App;
