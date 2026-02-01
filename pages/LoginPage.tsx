
import React, { useState, useContext, FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authContext) {
    return <div>Error: AuthContext not found</div>;
  }
  
  const { login, isAuthenticated } = authContext;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      login(username, password);
      navigate('/admin');
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-128px)]">
      <div className="w-full max-w-md p-8 space-y-6 bg-[var(--card)] rounded-lg shadow-md border border-[var(--border)]">
        <h1 className="text-2xl font-bold text-center">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="text-sm font-medium text-[var(--subtext)]">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 bg-[var(--subtle-bg)] border border-[var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
          </div>
          <div>
            <label htmlFor="password-login" className="text-sm font-medium text-[var(--subtext)]">Password</label>
            <input
              id="password-login"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 bg-[var(--subtle-bg)] border border-[var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-[var(--accent)] rounded-md hover:opacity-90 transition-opacity"
            >
              Log In
            </button>
          </div>
        </form>
        <div className="text-center text-sm text-[var(--subtext)]">
          <p>Username: izamvanced</p>
          <p>Password: jamil123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
