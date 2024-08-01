// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Chat from './pages/Chat';
import Home from './pages/Home';
import Map from './pages/Map';
import Service from './pages/Service';
import Signup from './pages/Signup';
const App = () => {
  return (
    <div>

      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/signup" element={<Signup />} />
        <Route path="/map" element={<Map />} />
        <Route path="/service" element={<Service />} />
        <Route path="/Chat" element={<Chat />} />
      </Routes>
    </div>
  );
};

export default App;
