import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginSignup from './components/LoginSignup';
import ProtectedPage from './components/ProtectedPage';
import AdminPage from './components/AdminPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login-signup" />} />
                <Route path="/login-signup" element={<LoginSignup />} />
                <Route path="/protected-page" element={<ProtectedPage />} />
                <Route path="/admin-page" element={<AdminPage />} />
            </Routes>
        </Router>
    );
};

export default App;