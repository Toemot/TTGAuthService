import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('User');
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            await axios.post('https://localhost:7135/api/auth/signup', { username, password, role });
            alert('User registered successfully');
        } catch (error) {
            console.error('Error during signup', error);
        }
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://localhost:7135/api/auth/login', { username, password });
            localStorage.setItem('token', response.data.token);
            navigate('/protected-page');
        } catch (error) {
            console.error('Error during login', error);
        }
    };

    return (
        <div>
            <h2>Login/Signup</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
            </select>
            <button onClick={handleSignup}>Sign Up</button>
            <button onClick={handleLogin}>Log In</button>
        </div>
    );
};

export default LoginSignup;