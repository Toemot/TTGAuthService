import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProtectedPage = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProtectedData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/protected-data', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsername(response.data.message);
            } catch (error) {
                console.error('Error fetching protected data', error);
            }
        };

        fetchProtectedData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login-signup');
    };

    return (
        <div>
            <h2>Protected Page</h2>
            <p>Welcome, {username}</p>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={() => navigate('/admin-page')}>Admin Page</button>
        </div>
    );
};

export default ProtectedPage;