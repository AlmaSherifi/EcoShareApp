'use client'
import React, { useState } from 'react';
import styles from './register.module.css';

const BASE_URL = 'http://localhost:5069/'; 
const REGISTER_URL = BASE_URL + "register"

export const registerUser = async (email, password) => {
    try {
        const response = await fetch(REGISTER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email,password})
        });
        if (!response.ok) {
            throw new Error('Failed to login');
        }
        const data = await response.json();
        localStorage.setItem('authToken',data.accessToken);
        return data.accessToken;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser(username, password); // Skicka både användarnamn och lösenord
            console.log('User logged in successfully:', response);
            setUsername('');
            setPassword('');
            // Handle login success here
        } catch (error) {
            console.error('Error logging in:', error);
            // Handle login error here
        }
    };



    return (
            <div className={styles.registerContainer}> 
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Enter your email" onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Enter your password"  onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
