import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "../src/app.css"
import Login from './pages/Login/app';
import Home from './pages/Home/app';
import ProfileCard from "./pages/Profile/ProfileCard/app";
import ProtectedRoute from './ProtectedRoute/app';
import PublicRoute from "./PublicRoute/app";
import WelcomePage from "./welcomepage/app";
import RestaurantAdminLogin from "./Admin/Login/app";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute><WelcomePage /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfileCard /></ProtectedRoute>} />
        <Route path="/admin-login" element={<PublicRoute><RestaurantAdminLogin /></PublicRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
