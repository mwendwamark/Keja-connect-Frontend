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
