import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import InputField from '../../components/InputField/InputField';
import './Login.css';

const LoginPage = ({ setIsAuth }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const { data, status } = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, {
                email,
                password,
            });

            if (status === 201 || status === 200) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('email', email);

                setIsAuth(true);
                navigate('/home');
            } else throw new Error(data?.message || 'Login failed due to an unknown error.');
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Login failed';
            console.error('Login failed:', err);
            alert(errorMessage);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">Login</h1>
                <form onSubmit={handleLogin} className="login-form">
                    <InputField
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputField
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        isPassword={true}
                        togglePassword={togglePasswordVisibility}
                        showPassword={showPassword}
                    />
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;