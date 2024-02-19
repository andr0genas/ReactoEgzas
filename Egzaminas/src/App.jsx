import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar';
import HomePage from './Components/HomePage'; 
import AddNewBook from './Components/AddNewBook';
import Response from './Components/Response';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes> 
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddNewBook />} />
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;
