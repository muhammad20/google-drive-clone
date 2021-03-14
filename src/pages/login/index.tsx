import React from 'react';
import { LoginForm } from './login-form';
import './login-page.css';

export const LoginPage: React.FC = () => {
    return (
        <div className="login-page-container">
            <h1>Welcome to Drive!</h1>
            <h2>A place where you can easily manage files and folders securely on the cloud</h2>
            <LoginForm/>
        </div>
    );
}