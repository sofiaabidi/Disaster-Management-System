import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import govtLogo from 'figma:asset/41e57d94a0a11f07ecf591200122d730a7f7b6fe.png';

interface LoginProps {
    onLogin: (username: string, password: string) => void;
}

export function Login({ onLogin }: LoginProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !password) {
            setError('Please enter both username and password');
            return;
        }

        setError('');
        onLogin(username, password);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#193cb8] p-6">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md p-10 border border-gray-200">
                {/* Header */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-24 h-24 bg-white rounded-full shadow-md flex items-center justify-center overflow-hidden mb-4 border-2 border-[#193cb8]">
                        <img
                            src={govtLogo}
                            alt="Government of India"
                            className="w-20 h-20 object-contain"
                        />
                    </div>
                    <h1 className="text-2xl font-bold text-[#193cb8] mb-1 text-center">
                        Disaster Management System
                    </h1>
                    <p className="text-gray-600 text-sm text-center">Government of India</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Username</label>
                        <Input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            autoComplete="username"
                            className="focus:ring-2 focus:ring-[#193cb8] focus:border-[#193cb8]"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            className="focus:ring-2 focus:ring-[#193cb8] focus:border-[#193cb8]"
                        />
                    </div>

                    {error && (
                        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-100">
                            {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full bg-[#193cb8] hover:bg-[#152f8a] text-white font-semibold py-2.5 rounded-lg transition-colors shadow-md h-auto"
                    >
                        Sign In
                    </Button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center text-xs text-gray-500">
                    <p>For authorized personnel only</p>
                    <p className="mt-2 text-[#193cb8]">Demo: Use any username/password to login</p>
                </div>
            </div>
        </div>
    );
}