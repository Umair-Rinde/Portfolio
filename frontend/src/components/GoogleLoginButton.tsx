'use client';

import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const GoogleLoginButton: React.FC = () => {
    const handleSuccess = async (credentialResponse: any) => {
        const { credential } = credentialResponse;
        if (!credential) {
            console.error("No credential received");
            return;
        }

        try {
            const response = await axios.get('http://127.0.0.1:8000/api/accounts/login/');
            console.log('Login Successful:', response.data);
            // Optionally handle user data here (e.g., store in state or localStorage)
        } catch (error: any) {
            console.error('Login Failed:', error.response?.data || error.message);
        }
    };

    const handleError = () => {
        console.error('Google Login Failed');
    };

    return (
        <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
        />
    );
};

export default GoogleLoginButton;
