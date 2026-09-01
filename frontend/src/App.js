import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { FeedPage } from './pages/FeedPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { Navbar } from './components/Navbar';
import { PrivateRoute } from './components/PrivateRoute';
import './styles/app.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route 
            path="/" 
            element={
              <PrivateRoute>
                <>
                  <Navbar />
                  <FeedPage />
                </>
              </PrivateRoute>
            } 
          />
          
          <Route 
            path="/notifications" 
            element={
              <PrivateRoute>
                <>
                  <Navbar />
                  <NotificationsPage />
                </>
              </PrivateRoute>
            } 
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
