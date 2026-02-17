import React, { useState } from 'react';
import { AuthResponse } from '../types';
import { API_URL } from '../config';

interface AuthProps {
  setToken: (token: string) => void;
}

export const Auth: React.FC<AuthProps> = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data: AuthResponse = await res.json();
    setToken(data.token);
    alert('Registered! Now log in.');
  };

  const login = async () => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data: AuthResponse = await res.json();
    setToken(data.token);
    alert('Logged in!');
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <h2>Auth</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
    </div>
  );
};
