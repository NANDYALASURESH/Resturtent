import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "../src/app.css"
import Login from './pages/Login/app';
import Home from './pages/Home/app'
import ProtectedRoute from './ProtectedRoute/app';
import PublicRoute from "./PublicRoute/app"
import ProfileCard from "./pages/Profile/ProfileCard/app"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
         <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
         <Route path="/profile" element={<ProtectedRoute><ProfileCard /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
