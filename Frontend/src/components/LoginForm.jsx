import React, { useState } from 'react';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useNavigate, Link } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCred.user.getIdToken();

      await fetch('http://localhost:5000/api/auth/sync', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.setItem('token', token);
      navigate('/');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCred = await signInWithPopup(auth, provider);
      const token = await userCred.user.getIdToken();

      await fetch('http://localhost:5000/api/auth/sync', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.setItem('token', token);
      navigate('/');
    } catch (err) {
      setError('Google sign-in failed.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl shadow-2xl p-10 space-y-6">
        <h2 className="text-3xl font-bold text-center text-white">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-white">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Type your email"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-white">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type your password"
              required
            />
          </div>

          <div className="text-right text-sm text-white hover:underline cursor-pointer">
            Forgot password?
          </div>

          <button
            type="submit"
            className="w-full py-2 font-bold text-white rounded-md bg-gradient-to-r from-cyan-400 to-pink-500 hover:opacity-90 transition-all"
          >
            LOGIN
          </button>
        </form>

        <div className="flex items-center justify-center">
          <span className="text-sm text-white">Or Sign in with</span>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleGoogleSignIn}
            className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full flex items-center gap-2"
          >
            <i className="fab fa-google"></i>
            Google
          </button>
        </div>

        <p className="text-center text-sm text-white">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline font-semibold">
            Sign up
          </Link>
        </p>

        {error && (
          <p className="text-center text-red-600 font-medium">{error}</p>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
