import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import InputField from '../../components/InputField/InputField';
import './SignUp.css';

const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        if (password.length < 8) {
            alert('Password must be at least 8 characters long');
            return;
        }

        try {
            const { data, status } = await axios.post(`${process.env.REACT_APP_API_URL}/users/signup`, { email, password });

            if (status === 201 || status === 200) {
                alert('Signup successful! Please log in.');
                navigate('/login');
            } else throw new Error(data?.message || 'Signup failed due to an unknown error.');
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Signup failed';
            console.error('Signup failed:', err);
            alert(errorMessage);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h1 className="signup-title">Sign Up</h1>
                <form onSubmit={handleSignUp} className="signup-form">
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
                    <InputField
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        isPassword={true}
                        togglePassword={togglePasswordVisibility}
                        showPassword={showPassword}
                    />
                    <button type="submit" className="signup-button">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;