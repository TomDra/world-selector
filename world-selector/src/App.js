import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Map from './Components/pages/map'
import NavigationBar from './Components/navigation_bar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <NavigationBar />
          <div className="content-wrapper">
            <Routes>
              <Route path="/map" element={<Map />} />

              {/* Add other routes as needed */}
            </Routes>
          </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
