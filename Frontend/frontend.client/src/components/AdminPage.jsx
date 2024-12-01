import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const navigate = useNavigate();

    const handleDownloadCsv = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/admin-data/csv', {
                headers: { Authorization: `Bearer ${token}` },
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'data.csv');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading CSV', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login-signup');
    };

    return (
        <div>
            <h2>Admin Page</h2>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={() => navigate('/protected-page')}>Protected Page</button>
            <button onClick={handleDownloadCsv}>Download CSV</button>
        </div>
    );
};

export default AdminPage;