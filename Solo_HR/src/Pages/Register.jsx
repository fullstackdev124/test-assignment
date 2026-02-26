import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';

export default function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setSubmitting(true);
    try {
      await register(email, username, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar2 />
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-xl border border-gray-700 bg-gray-900/50 p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-foreground mb-6">Create account</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <p className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-md px-3 py-2">
                {error}
              </p>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-md border border-gray-600 bg-gray-800 text-foreground px-4 py-2 focus:border-[#138695] focus:ring-1 focus:ring-[#138695] outline-none"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full rounded-md border border-gray-600 bg-gray-800 text-foreground px-4 py-2 focus:border-[#138695] focus:ring-1 focus:ring-[#138695] outline-none"
                placeholder="johndoe"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-md border border-gray-600 bg-gray-800 text-foreground px-4 py-2 focus:border-[#138695] focus:ring-1 focus:ring-[#138695] outline-none"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full rounded-md border border-gray-600 bg-gray-800 text-foreground px-4 py-2 focus:border-[#138695] focus:ring-1 focus:ring-[#138695] outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#138695] text-white font-semibold py-2 rounded-md hover:bg-[#0f6d7a] transition-colors disabled:opacity-50"
            >
              {submitting ? 'Creating account…' : 'Sign up'}
            </button>
          </form>
          <p className="mt-4 text-center text-gray-400 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-[#138695] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
