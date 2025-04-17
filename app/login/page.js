"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginFloating from '../../components/LoginFloating/LoginFloating';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3002/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        router.push(data.user.role === 'ADMIN' ? '/admin' : '/');
      } else {
        setError(data.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Error del servidor, intenta nuevamente más tarde');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img className='logo-login' src="./logo.png" alt="" />
        <h2>Bienvenido de vuelta</h2>
        {error && <div className="error-message">{error}</div>}
        <form className='formulario' onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder='Correo electrónico'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder='Contraseña'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className='login-button' type="submit">Iniciar Sesión</button>
        </form>
        <LoginFloating />
      </div>
    </div>
  );
};

export default Login;
