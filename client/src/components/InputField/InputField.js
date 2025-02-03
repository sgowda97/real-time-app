import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import './InputField.css';

const InputField = ({ type, placeholder, value, onChange, isPassword, togglePassword, showPassword }) => (
    <div className="input-container">
        <input
            type={isPassword && !showPassword ? 'password' : 'text'}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required
            className="input-field"
        />
        {isPassword && (
            <button
                type="button"
                onClick={togglePassword}
                className="password-toggle-btn"
            >
                {showPassword ? <EyeOff /> : <Eye />}
            </button>
        )}
    </div>
);

export default InputField;
