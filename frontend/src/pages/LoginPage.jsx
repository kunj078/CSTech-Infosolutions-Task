import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import SuccessToast from '../components/SuccessToast';
import ErrorToast from '../components/ErrorToast';
import Spinner from '../components/Spinner';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      setErrorMessage('Email & password are required');
      setShowError(true);
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long');
      setShowError(true);
      setLoading(false);
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage('Invalid email format');
      setShowError(true);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setSuccessMessage('Login successful!');
      setShowSuccess(true);
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setErrorMessage(err.response?.data?.error || 'Login failed');
      setShowError(true);
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? <Spinner /> : 'Login'}
        </button>

        <p className="mt-4 text-sm text-center">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </form>

      {/* Toast Notifications */}
      {showSuccess && (
        <SuccessToast message={successMessage} onClose={() => setShowSuccess(false)} />
      )}
      {showError && (
        <ErrorToast message={errorMessage} onClose={() => setShowError(false)} />
      )}
    </div>
  );
};

export default LoginPage;
