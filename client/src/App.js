import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage/Login';
import SignUpPage from './pages/SignUpPage/SignUp';
import CollaborationPage from './pages/CollaborationPage/Collaboration';
import HomePage from './pages/HomePage/Home';
import Header from './components/Header/Header';
import { jwtDecode } from "jwt-decode";

const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
        const { exp } = jwtDecode(token);
        const expiry = exp * 1000;
        const currentTime = Date.now();

        return expiry > currentTime;
    } catch (err) {
        console.error('Error decoding token:', err);
        return false;
    }
};

function App() {
    const [isAuth, setIsAuth] = useState(isAuthenticated());

    useEffect(() => {
        const handleStorageChange = () => {
            setIsAuth(isAuthenticated());
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <Router>
            <Header setIsAuth={setIsAuth} />
            <Routes>
                <Route path="/login" element={isAuth ? <HomePage /> : <LoginPage setIsAuth={setIsAuth} />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/collaboration/:documentId" element={isAuth ? <CollaborationPage /> : <Navigate to="/login" />} />
                <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/login" />} />
                <Route path="*" element={<LoginPage setIsAuth={setIsAuth} />} />
            </Routes>
        </Router>
    );
}

export default App;