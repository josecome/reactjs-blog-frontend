import {useState} from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './views/Home';
import Posts from './views/Posts'
import Content from './views/Content'
import Create_Content from './views/Create_Content'
import About from './views/About';

function App() {
  return (
    <Router>
      <div className="App">
        <Header 
          title="Test"
        />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/posts/:link' element={<Posts />} />
          <Route path='/content/:link' element={<Content />} />
          <Route path='/create_content/:link' element={<Create_Content />} />
          <Route path='/About' element={<About />} />
        </Routes>
        <Footer />          
      </div>    
    </Router> 
  );
}

export default App;
