import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/app';
import Home from './pages/Home/app'
import ProtectedRoute from './ProtectedRoute/app';
import PublicRoute from "./PublicRoute/app"
import WelcomePage from "./welcomepage/app"
import Admin from "./Admin/Home/app"
import AdminLogin from "./Admin/Login/app"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute><WelcomePage /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/admin" element={<PublicRoute><Admin/></PublicRoute>} />
        <Route path="/admin-login" element={<PublicRoute><AdminLogin/></PublicRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;