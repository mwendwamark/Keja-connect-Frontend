<<<<<<< HEAD
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Import files
import "./App.css";
import HomePage from "./Pages/HomePage/HomePage";
import Navbar from "./Components/Navbar/Navbar";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
=======
import React from 'react'
import './App.css'

function App() {


  return (
    <>
      <h2>HELOO my gEE</h2>
    
  <p>HElolo hoiede kdxfjasd  ksdmark mmwendwa</p>
    </>
  )
}

export default App
>>>>>>> c5d538d1ede761c26100b5956f5c4a196dc47c30
